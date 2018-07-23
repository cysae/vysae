import { call, all, put, takeLatest } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import Amplify, { Auth, API } from 'aws-amplify'
import Promise from 'bluebird'
import _ from 'lodash'
import {
    USERS_SIGNUP_REQUESTED,
    COMPANY_SELECTION_REQUESTED,
    COMPANY_SELECTION_SUCCEEDED,
    USERS_TO_COMPANY_ADMIN_REQUESTED,
    USERS_TO_COMPANY_ADMIN_SUCCEEDED,
    GET_SIGNED_IN_USER_REQUESTED,
    GET_SIGNED_IN_USER_SUCCEEDED,
    GET_MY_COMPANIES_REQUESTED,
    GET_MY_COMPANIES_SUCCEEDED,
    ADD_MEETING_TO_COMPANY_REQUESTED,
    ADD_MEETING_TO_COMPANY_SUCCEEDED,
    VOTE_REQUESTED,
    requestCompanySelection,
} from '../actions/index.js'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)

const company = {
    pk: 'company-1',
    sk: 'company-1',
    data: 'name'
}
console.log('putted')
API.put('vysaeCRUD', `/vysae`, { body: company })
    .then(res => console.log(res))
    .catch(e => console.log(e))

const queryCompany = (companyId) => {
    return API.get('companyCRUD', `/company/${companyId}`).then(res => res[0])
}
const updateCompany = (company) => {
    return API.put('companyCRUD', '/company', { body: company })
}

const queryCompanies = (companyIds) => {
    const promises = companyIds.map(id => {
        return API.get('companyCRUD', `/company/${id}`).then(res => res[0])
    })
    return Promise.all(promises)
}

const queryPoolUser = () => {
    return Auth.currentAuthenticatedUser().then(res => {
        return {
            dni: res.username,
            email: res.attributes.email
        }
    })
}
const queryDBUsers = (users) => {
    const promises = users.map(user => {
        return API.get('userCRUD', `/user/${user.dni}`).then(res => res[0])
    })
    return Promise.all(promises)
}
const updateUsers = (users) => {
    const promises = users.map(user => {
        return API.post('userCRUD', `/user`, {body: user})
    })
    return Promise.all(promises)
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* updateCompanySaga(action) {
    let { companyId, body } = action.payload
    try {
        const company = yield call([API, 'get'], 'companyCRUD', `/company/${companyId}`)
        body = {...company[0], ...body}
        yield call([API, 'put'], 'companyCRUD', `/company`, {body})
        yield put({type: "COMPANY_UPDATE_SUCCEEDED", company });
    } catch (e) {
        console.log('saga error: ', e)
    }
}

function* signUpUsers(action) {
    const { users, companyId } = action.payload
    try {
        yield all(users.map((user) => {
            return call([Auth, 'signUp'], user)
        }))
        yield all(users.map((user) => {
            const body = {
                username: user.username,
                companyId
            }

            return call([API, 'post'], 'userCRUD', '/user', {body})
        }))
        yield put({type: 'USERS_SIGNUP_SUCCEEDED', users})
    } catch (e) {
        console.log('saga signUpUser error:', e)
    }
}

function* usersToCompanyAdmin(action) {
    const { users, companyId } = action.payload
    try {
        const shareholders = yield call(queryDBUsers, users)
        for (const shareholder of shareholders) {
            if(shareholder.administrates === undefined || shareholder.administrates.constructor !== Array) {
                shareholder.administrates = []
            }
            if(!shareholder.administrates.includes(companyId)) {
                shareholder.administrates.push(companyId)
            }
        }
        yield call(updateUsers, shareholders)
        yield put({type: USERS_TO_COMPANY_ADMIN_SUCCEEDED})
    } catch (e) {
        console.log('saga signUpUser error:', e)
    }
}

function* getMyCompanies() {
    try {
        const poolUser = yield call(queryPoolUser)
        const dbUsers = yield call(queryDBUsers, [poolUser])
        const dbUser = dbUsers[0]

        const companyIds = _.uniq(dbUser.administrates, dbUser.companies)
        const companies = yield call(queryCompanies, companyIds)

        yield put({type: GET_MY_COMPANIES_SUCCEEDED, companies})
    } catch(e) {
        console.log(e)
    }
}

function* selectCompany(action) {
    let { companyId } = action.payload
    try {
        const companies = yield call([API, 'get'], 'companyCRUD', `/company/${companyId}`)
        const company = companies[0]
        yield put({type: COMPANY_SELECTION_SUCCEEDED, company})
    } catch(e) {
        console.log('saga selectCompany error:', e)
    }
}

function* getSignedInUser() {
    try {
        const poolUser = yield call(queryPoolUser)
        const dbUsers = yield call(queryDBUsers, [poolUser])
        const dbUser = dbUsers[0]
        const user = { ...poolUser, ...dbUser }

        yield put({ type: GET_SIGNED_IN_USER_SUCCEEDED, user })
    } catch(e) {
        console.log(e)
    }
}

function* addMeetingToCompany(action) {
    let { companyId, meeting } = action.payload
    meeting.uuid = uuid()
    try {
        const company = yield call(queryCompany, companyId)
        company.meetings = company.meetings || []
        company.meetings.push(meeting)
        yield call(updateCompany, company)
        yield put({type: ADD_MEETING_TO_COMPANY_SUCCEEDED})
        yield put(requestCompanySelection(companyId))
    } catch(e) {
        console.log(e)
        // just for FAKE
        yield put({type: ADD_MEETING_TO_COMPANY_SUCCEEDED})
    }
}

function* addVoteToMeeting(action) {
    let { voteForm, meetingId, companyId } = action.payload
    try {
        const company = yield call(queryCompany, companyId)
        for(const meeting of company.meetings) {
            if(meeting.uuid === meetingId) {
                const vote = {
                    ...voteForm,
                }
                meeting.votes = meeting.votes || []
                meeting.votes.push(vote)
                break
            }
        }
    } catch(e) {
        console.log(e)
    }
}


function* mySaga() {
    yield takeLatest("COMPANY_UPDATE_REQUESTED", updateCompanySaga)
    yield takeLatest(USERS_SIGNUP_REQUESTED, signUpUsers)
    yield takeLatest(COMPANY_SELECTION_REQUESTED, selectCompany)
    yield takeLatest(USERS_TO_COMPANY_ADMIN_REQUESTED, usersToCompanyAdmin)
    yield takeLatest(GET_SIGNED_IN_USER_REQUESTED, getSignedInUser)
    yield takeLatest(GET_MY_COMPANIES_REQUESTED, getMyCompanies)
    yield takeLatest(ADD_MEETING_TO_COMPANY_REQUESTED, addMeetingToCompany)
    yield takeLatest(VOTE_REQUESTED, addVoteToMeeting)
}

export default mySaga;

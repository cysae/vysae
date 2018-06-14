import { call, all, put, takeLatest } from 'redux-saga/effects'
import Amplify, { Auth, API } from 'aws-amplify'
import Promise from 'bluebird'
import {
    USERS_SIGNUP_REQUESTED,
    COMPANY_SELECTION_REQUESTED,
    COMPANY_SELECTION_SUCCEEDED,
    USERS_TO_COMPANY_ADMIN_REQUESTED,
    USERS_TO_COMPANY_ADMIN_SUCCEEDED,
} from '../actions/index.js'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)

const queryUsers = (users) => {
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
// const users = [{ dni: 'test' }, { dni: 'asd'}]
// console.log(queryUsers(users))
// queryUsers(users).then(res => console.log(res))

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* updateCompany(action) {
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
        const shareholders = yield call(queryUsers, users)
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


function* mySaga() {
    yield takeLatest("COMPANY_UPDATE_REQUESTED", updateCompany)
    yield takeLatest(USERS_SIGNUP_REQUESTED, signUpUsers)
    yield takeLatest(COMPANY_SELECTION_REQUESTED, selectCompany)
    yield takeLatest(USERS_TO_COMPANY_ADMIN_REQUESTED, usersToCompanyAdmin)
}

export default mySaga;

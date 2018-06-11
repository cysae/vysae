import { call, all, put, takeLatest } from 'redux-saga/effects'
import Amplify, { Auth, API } from 'aws-amplify'
import {
    USERS_SIGNUP_REQUESTED,
    COMPANY_SELECTION_REQUESTED,
    COMPANY_SELECTION_SUCCEEDED,
} from '../actions/index.js'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)


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
    const { users } = action.payload
    try {
        const data = yield all(users.map((user) => {
            return call([Auth, 'signUp'], user)
        }))
        yield put({type: 'USERS_SIGNUP_SUCCEEDED', users})
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
    yield takeLatest("COMPANY_UPDATE_REQUESTED", updateCompany);
    yield takeLatest(USERS_SIGNUP_REQUESTED, signUpUsers);
    yield takeLatest(COMPANY_SELECTION_REQUESTED, selectCompany);
}

export default mySaga;

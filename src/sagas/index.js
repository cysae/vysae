import { call, all, put, takeLatest } from 'redux-saga/effects'
import Amplify, { Auth, API } from 'aws-amplify'
import {
   USERS_SIGNUP_REQUESTED
} from '../actions/index.js'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)


const user = {
    username: 'test',
    password: '%Test1991',
    attributes: {
        email: 'test@test.de',
        phone_number: '+14155552671',
        [`custom:firstName`]: 'Dirk',
        [`custom:lastName`]: 'Hornung',
    }
}
const user2 = {
    username: 'test2',
    password: '%Test1991',
    attributes: {
        email: 'test@test.de',
        phone_number: '+14155552671',
        [`custom:firstName`]: 'Dirk',
        [`custom:lastName`]: 'Hornung',
    }
}
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* updateCompany(action) {
    console.log('company exec')
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
    action.payload.users = [user, user2]
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


function* mySaga() {
    yield takeLatest("COMPANY_UPDATE_REQUESTED", updateCompany);
    yield takeLatest(USERS_SIGNUP_REQUESTED, signUpUsers);
}

export default mySaga;

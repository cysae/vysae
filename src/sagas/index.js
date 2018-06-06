import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Amplify, { API } from 'aws-amplify'
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

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
    yield takeEvery("COMPANY_FETCH_REQUESTED", 'test');
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
    yield takeLatest("COMPANY_UPDATE_REQUESTED", updateCompany);
}

export default mySaga;

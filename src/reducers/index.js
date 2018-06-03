import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { SAVE_COMPANY_FORM, UPDATE_ANNOUNCEMENT } from '../actions/index'
import moment from 'moment'

function companyForm(state = {}, action) {
    switch(action.type) {
    case SAVE_COMPANY_FORM:
        return {
            ...state,
            ...action.payload,
        }
    default:
        return state;
    }
}

const announcementExample = {
    companyName: 'CYSAE',
    meetingType: 'ordinaryMeeting',
    person: 'Javier',
    votingStart: moment(),
    votingEnd: moment(),
    location: 'barcelona',
    agreementTypes: ['hello', 'hola'],
    additionalInfo: 'test',
}
function announcement(state = announcementExample, action) {
    switch(action.type) {
    case UPDATE_ANNOUNCEMENT:
        return {
            ...state,
            ...action.payload
        }
    default:
        return state
    }
}

const reducers = combineReducers({
    companyForm,
    announcement,
    router: routerReducer
})

export default reducers;

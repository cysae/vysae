import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
    SAVE_COMPANY_FORM,
    UPDATE_ANNOUNCEMENT,
    COMPANY_SELECTION_SUCCEEDED,
} from '../actions/index'
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

function selectedCompany(state = {}, action) {
    switch(action.type) {
    case COMPANY_SELECTION_SUCCEEDED:
        return {
            ...action.company
        }
    default:
        return state
    }
}

const reducers = combineReducers({
    companyForm,
    announcement,
    selectedCompany,
    router: routerReducer
})

export default reducers;

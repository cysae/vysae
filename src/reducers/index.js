import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
    SAVE_COMPANY_FORM,
    UPDATE_ANNOUNCEMENT,
    COMPANY_SELECTION_REQUESTED,
    COMPANY_SELECTION_SUCCEEDED,
    GET_SIGNED_IN_USER_REQUESTED,
    GET_SIGNED_IN_USER_SUCCEEDED,
    GET_MY_COMPANIES_REQUESTED,
    GET_MY_COMPANIES_SUCCEEDED,
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

function myCompanies(state = { isLoading: true }, action) {
    switch(action.type) {
    case GET_MY_COMPANIES_REQUESTED:
        return {
            isLoading: true,
        }
    case GET_MY_COMPANIES_SUCCEEDED:
        return {
            isLoading: false,
            companies: action.companies
        }
    default:
        return state
    }
}


function selectedCompany(state = {}, action) {
    switch(action.type) {
    case COMPANY_SELECTION_REQUESTED:
        return {
            isLoading: true,
        }
    case COMPANY_SELECTION_SUCCEEDED:
        return {
            isloading: false,
            ...action.company
        }
    default:
        return state
    }
}

function signedInUser(state = {}, action) {
    switch(action.type) {
    case GET_SIGNED_IN_USER_REQUESTED:
        return {
            isLoading: true
        }
    case GET_SIGNED_IN_USER_SUCCEEDED:
        return {
            isLoading: false,
            ...action.user
        }
    default:
        return state
    }
}

const reducers = combineReducers({
    companyForm,
    announcement,
    myCompanies,
    selectedCompany,
    signedInUser,
    router: routerReducer
})

export default reducers;

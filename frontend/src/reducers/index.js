import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
    SAVE_COMPANY_FORM,
    UPDATE_MEETING_FORM,
    COMPANY_SELECTION_REQUESTED,
    COMPANY_SELECTION_SUCCEEDED,
    GET_SIGNED_IN_USER_REQUESTED,
    GET_SIGNED_IN_USER_SUCCEEDED,
    GET_MY_COMPANIES_REQUESTED,
    GET_MY_COMPANIES_SUCCEEDED,
    ADD_MEETING_TO_COMPANY_REQUESTED,
    ADD_MEETING_TO_COMPANY_SUCCEEDED,
    UPDATE_VOTE_FORM,
    SELECT_MEETING,
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

function meetingForm(state = {}, action) {
    switch(action.type) {
    case UPDATE_MEETING_FORM:
        return {
            ...state,
            ...action.payload,
        }
    case ADD_MEETING_TO_COMPANY_REQUESTED:
        return {
            ...state,
            isUpdating: true
        }
    case ADD_MEETING_TO_COMPANY_SUCCEEDED:
        return {
            ...state,
            isUpdating: false
        }
    default:
        return state
    }
}

function voteForm(state = {}, action) {
    switch(action.type) {
    case UPDATE_VOTE_FORM:
        return { ...state, ...action.payload }
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

function selectedMeeting(state = {}, action) {
    switch(action.type) {
    case SELECT_MEETING:
        return { ...action.payload.meeting }
    default:
        return state
    }
}

const reducers = combineReducers({
    companyForm,
    meetingForm,
    voteForm,
    myCompanies,
    selectedCompany,
    selectedMeeting,
    signedInUser,
    router: routerReducer
})

export default reducers;

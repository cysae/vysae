import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
    SAVE_COMPANY_FORM,
    UPDATE_MEETING_FORM,
    GET_SIGNED_IN_USER_REQUESTED,
    GET_SIGNED_IN_USER_SUCCEEDED,
    ADD_MEETING_TO_COMPANY_REQUESTED,
    ADD_MEETING_TO_COMPANY_SUCCEEDED,
    UPDATE_VOTE_FORM,
    SELECT_MEETING,
} from '../actions/index'

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
    selectedMeeting,
    signedInUser,
    router: routerReducer
})

export default reducers;

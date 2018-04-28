import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { SAVE_COMPANY_FORM } from '../actions/index'

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

const reducers = combineReducers({
    companyForm,
    router: routerReducer
})

export default reducers;

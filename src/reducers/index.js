import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

function companyForm(state = {
    denominacionSocial: {
        value: 'dirk'
    },
}, action) {
    switch(action.type) {
    case 'save_fields':
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

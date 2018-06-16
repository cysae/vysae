/*
 * action types
 */
export const SAVE_COMPANY_FORM = 'SAVE_COMPANY_FORM'
export const UPDATE_MEETING_FORM = 'UPDATE_MEETING_FORM'
export const COMPANY_UPDATE_REQUESTED = 'COMPANY_UPDATE_REQUESTED'
export const USERS_TO_COMPANY_ADMIN_REQUESTED = 'USERS_TO_COMPANY_ADMIN_REQUESTED'
export const USERS_TO_COMPANY_ADMIN_SUCCEEDED = 'USERS_TO_COMPANY_ADMIN_SUCEEDED'
export const USERS_SIGNUP_REQUESTED = 'USERS_SIGNUP_REQUESTED'
export const COMPANY_SELECTION_REQUESTED = 'COMPANY_SELECT_REQUESTED'
export const COMPANY_SELECTION_SUCCEEDED = 'COMPANY_SELECT_SUCCEEDED'
export const SELECT_COMPANY = 'SELECT_COMPANY'
export const GET_SIGNED_IN_USER_REQUESTED = 'GET_SIGNED_IN_USER_REQUESTED'
export const GET_SIGNED_IN_USER_SUCCEEDED = 'GET_SIGNED_IN_USER_SUCCEEDED'
export const GET_MY_COMPANIES_REQUESTED = 'GET_MY_COMPANIES_REQUESTED'
export const GET_MY_COMPANIES_SUCCEEDED = 'GET_MY_COMPANIES_SUCCEEDED'

/*
 * action creators
 */
export function saveCompanyForm(changedFields) {
    return {
        type: SAVE_COMPANY_FORM,
        payload: changedFields
    }
}

export function updateMeetingForm(changedFields) {
    return {
        type: UPDATE_MEETING_FORM,
        payload: changedFields
    }
}

export function requestCompanyUpdate(companyId, body) {
    return {
        type: COMPANY_UPDATE_REQUESTED,
        payload: { companyId, body }
    }
}

export function requestUsersToCompanyAdmin(users, companyId) {
    return {
        type: USERS_TO_COMPANY_ADMIN_REQUESTED,
        payload: { users, companyId }
    }
}

export function requestUsersSignUp(users, companyId) {
    return {
        type: USERS_SIGNUP_REQUESTED,
        payload: { users, companyId }
    }
}

export function requestSignedInUser() {
    return {
        type: GET_SIGNED_IN_USER_REQUESTED
    }
}

export function requestCompanySelection(companyId) {
    return {
        type: COMPANY_SELECTION_REQUESTED,
        payload: { companyId }
    }
}
export function selectCompany(company) {
    return {
        type: SELECT_COMPANY,
        payload: company
    }
}

export function requestMyCompanies() {
    return {
        type: GET_MY_COMPANIES_REQUESTED
    }
}

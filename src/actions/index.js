/*
 * action types
 */
export const SAVE_COMPANY_FORM = 'SAVE_COMPANY_FORM'
export const UPDATE_ANNOUNCEMENT = 'UPDATE_ANNOUNCEMENT'
export const COMPANY_UPDATE_REQUESTED = 'COMPANY_UPDATE_REQUESTED'
export const USERS_SIGNUP_REQUESTED = 'USERS_SIGNUP_REQUESTED'
export const COMPANY_SELECTION_REQUESTED = 'COMPANY_SELECT_REQUESTED'
export const COMPANY_SELECTION_SUCCEEDED = 'COMPANY_SELECT_SUCCEEDED'
export const SELECT_COMPANY = 'SELECT_COMPANY'

/*
 * action creators
 */
export function saveCompanyForm(changedFields) {
    return {
        type: SAVE_COMPANY_FORM,
        payload: changedFields
    }
}

export function updateAnnouncement(announcement) {
    return {
        type: UPDATE_ANNOUNCEMENT,
        payload: announcement
    }
}

export function requestCompanyUpdate(companyId, body) {
    return {
        type: COMPANY_UPDATE_REQUESTED,
        payload: { companyId, body }
    }
}

export function requestUsersSignUp(users) {
    return {
        type: USERS_SIGNUP_REQUESTED,
        payload: { users }
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

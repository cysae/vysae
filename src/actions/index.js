// utils
import { v4 as uuid } from 'uuid'

/*
 * action types
 */
export const SAVE_COMPANY_FORM = 'SAVE_COMPANY_FORM'
export const CREATE_COMPANY_ID = 'CREATE_COMPANY_ID'
export const UPDATE_ANNOUNCEMENT = 'UPDATE_ANNOUNCEMENT'

/*
 * action creators
 */
export function saveCompanyForm(changedFields) {
    return {
        type: SAVE_COMPANY_FORM,
        payload: changedFields
    }
}
export function createCompanyId() {
    return {
        type: CREATE_COMPANY_ID,
        payload: { companyId: uuid() }
    }
}



export function updateAnnouncement(announcement) {
    return {
        type: UPDATE_ANNOUNCEMENT,
        payload: announcement
    }
}

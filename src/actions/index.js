/*
 * action types
 */
export const SAVE_COMPANY_FORM = 'SAVE_COMPANY_FORM';
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

export function updateAnnouncement(announcement) {
    return {
        type: UPDATE_ANNOUNCEMENT,
        payload: announcement
    }
}

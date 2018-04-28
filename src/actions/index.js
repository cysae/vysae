/*
 * action types
 */
export const SAVE_COMPANY_FORM = 'SAVE_COMPANY_FORM';

/*
 * action creators
 */
export function saveCompanyForm(changedFields) {
    return {
        type: SAVE_COMPANY_FORM,
        payload: changedFields
    };
}

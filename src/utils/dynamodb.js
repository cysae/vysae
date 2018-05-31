import { API } from 'aws-amplify'

export async function updateCompany(companyId, body) {
    const company = await API.get('companyCRUD', `/company/${companyId}`)
    body = {...company[0], ...body}
    console.log(body)
}

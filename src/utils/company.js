import Amplify, { API } from "aws-amplify";
import aws_config from "../aws-exports";


export async function getCompany(id) {
    API.get('companyCRUD', `/company/${id}`).then(response => {
        return response
    }).catch(error => {
        console.log('getCompany error: ', error)
    });
}

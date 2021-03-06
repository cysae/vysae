// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { CreateCompany, CreateCompanyUser } from '../../../graphql/mutations'

export default (userId, input) => {
  return API.graphql(graphqlOperation(gqlToString(CreateCompany), input))
    .then(({ data: { createCompany }}) => {
      return API.graphql(graphqlOperation(
        gqlToString(CreateCompanyUser), {
          input: {
            companyUserCompanyId: createCompany.id,
            companyUserUserId: userId
          }
        }
      ))
    })
}

import gql from 'graphql-tag'

export default gql`
query QueryGetCompany (
  $companyId: ID!
  $shareholdersLimit: Int
  $shareholdersNextToken: String
) {
  getCompany(
    companyId: $companyId
  ) {
    companyId
    name,
    placeOfBusiness,
    nif,
    shareholders(
      limit: $shareholdersLimit
      nextToken: $shareholdersNextToken
    ) @connection (
      key: ["shareholders"]
    ) {
      items {
        shareholderId
        companyId
        userId
        name
      }
      nextToken
    }
  }
}`

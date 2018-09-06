import gql from 'graphql-tag'

export default gql`
query QueryGetCompany (
  $companyId: ID!
  $shareholdersLimit: Int
  $shareholdersNextToken: String
  $withShareholdersUsers: Boolean = false
  $shareholdersUsersLimit: Int
  $shareholdersUsersNextToken: String
) {
  getCompany(
    companyId: $companyId
  ) {
    companyId
    name,
    shareholders(
      limit: $shareholdersLimit
      nextToken: $shareholdersNextToken
    ) @connection (
      key: ["shareholders"]
    ) {
      items {
        shareholderId
        companyId
        name
        users (
          limit: $shareholdersUsersLimit
          nextToken: $shareholdersUsersNextToken
        ) @include(if: $withShareholdersUsers) {
          items {
            userId
          }
          nextToken
        }
      }
      nextToken
    }
  }
}`

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

// $withMeetings: Boolean = false
// $withAgreements: Boolean = false
// $withVotes: Boolean = false

// meetings @include(if: $withMeetings) {
//   id
//   start
//   end
//   agreements @include(if: $withAgreements) {
//     id,
//     name,
//     votes @include(if: $withVotes) {
//       id
//       result
//     }
//   }
// }

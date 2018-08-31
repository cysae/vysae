import gql from 'graphql-tag'

export default gql`
query QueryGetCompany (
  $companyId: ID!
  $withShareholders: Boolean = false
  $shareholdersLimit: Int
  $shareholdersNextToken: String
) {
  getCompany(
    companyId: $companyId
  ) {
    companyId
    name,
    shareholders(
      limit: $shareholdersLimit
      nextToken: $shareholdersNextToken
    ) @include(if: $withShareholders) {
      items {
        shareholderId
        name
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

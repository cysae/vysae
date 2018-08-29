import gql from 'graphql-tag'

export default gql`
query QueryGetCompany (
  $companyId: ID!
) {
  getCompany(companyId: $companyId) {
    companyId
    name
  }
}`

// $withMeetings: Boolean = false
// $withAgreements: Boolean = false
// $withVotes: Boolean = false
// $withShareholders: Boolean = false

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
// shareholders @include(if: $withShareholders) {
//   id
//   name
// }

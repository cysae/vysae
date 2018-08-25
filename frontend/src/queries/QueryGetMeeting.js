import gql from 'graphql-tag'

export default gql`
query QueryGetMeeting(
  $id: ID!
  $withAgreements: Boolean = false
  $withVotes: Boolean = false
) {
  getMeeting(id: $id) {
    id,
    agreements @include(if: $withAgreements) {
      id,
      name,
      votes @include(if: $withVotes) {
        id,
        result
      }
    }
  }
}`

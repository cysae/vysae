import gql from 'graphql-tag'

export default gql`
query (
  $id: String!
  $withMeetings: Boolean = false
  $withAgreements: Boolean = false
  $withVotes: Boolean = false
  ) {
  queryCompany(id: $id) {
    id,
    name,
    meetings @include(if: $withMeetings) {
      id,
      start,
      end
      agreements @include(if: $withAgreements) {
        id,
        name,
        votes @include(if: $withVotes) {
          id,
          result
        }
      }
    }
  }
}`

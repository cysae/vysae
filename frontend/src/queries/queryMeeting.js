import gql from 'graphql-tag'

export default gql`
query($id: String!, $withAgreements: Boolean = false, $withVotes: Boolean = false) {
  queryMeeting(id: $id) {
    id,
    agreements @include(if: $withAgreements) {
      id,
      name,
      votes @include(if: $withVotes) {
        id
      }
    }
  }
}`

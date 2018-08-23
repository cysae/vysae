import gql from 'graphql-tag'

export default gql`
query ($id: String! $withMeetings: Boolean = false $withAgreements: Boolean = false) {
  queryCompany(id: $id) {
    id,
    name,
    meetings @include(if: $withMeetings) {
      id,
      start,
      end
      agreements @include(if: $withAgreements) {
        id,
        name
      }
    }
  }
}`

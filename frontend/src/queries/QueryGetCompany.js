import gql from 'graphql-tag'

export default gql`
query QueryGetCompany (
  $id: ID!
  $withMeetings: Boolean = false
  $withAgreements: Boolean = false
  $withVotes: Boolean = false
  $withShareholders: Boolean = false
) {
  getCompany(id: $id) {
    id
    name
    meetings @include(if: $withMeetings) {
      id
      start
      end
      agreements @include(if: $withAgreements) {
        id,
        name,
        votes @include(if: $withVotes) {
          id
          result
        }
      }
    }
    shareholders @include(if: $withShareholders) {
      id
    }
  }
}`

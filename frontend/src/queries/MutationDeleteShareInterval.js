import gql from 'graphql-tag'

export default gql(`
  mutation MutationDeleteShareInterval(
    $companyId: ID!
    $start: Int!
  ) {
    deleteShareInterval(
      companyId: $companyId
      start: $start
    ) {
      companyId
      start
    }
  }
`)

import gql from 'graphql-tag'

export default gql(`
mutation MutationCreateShareholder(
  $companyId: ID!
  $name: String!
) {
  createShareholder (
    companyId: $companyId
    name: $name
  ) {
    shareholderId
    companyId
    userId
    name
  }
}
`)


import gql from 'graphql-tag'

export default gql(`
mutation MutationCreateCompany($name: String!) {
  createCompany(
    name: $name
  ) {
    id
    name
  }
}
`)


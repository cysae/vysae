import gql from 'graphql-tag'

export default gql(`
mutation updateCompany(
  $companyId: ID!
  $name: String!
  $placeOfBusiness: String!
  $nif: String!
) {
  updateCompany(
    companyId: $companyId
    name: $name
    placeOfBusiness: $placeOfBusiness
    nif: $nif
  ) {
    companyId
    name
    placeOfBusiness
    nif
  }
}
`)

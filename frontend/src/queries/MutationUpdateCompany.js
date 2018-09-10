import gql from 'graphql-tag'

export default gql(`
mutation updateCompany {
  updateCompany(
    companyId:  "89c01be1-3f6c-4170-b95b-c6686c9f9c4f"
    name: "oook"
    placeOfBusiness: "fulda"
    nif: "sdf"
  ) {
    companyId
    name
    placeOfBusiness
    nif
  }
}
`)

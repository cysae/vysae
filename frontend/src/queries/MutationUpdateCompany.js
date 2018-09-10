import gql from 'graphql-tag'

export default gql(`
  mutation MutationUpdateCompany($name: String!) {
    updateCompany( name: $name ) {
      companyId
      name
    }
  }
`)

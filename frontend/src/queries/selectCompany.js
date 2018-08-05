import gql from 'graphql-tag'

export default gql`
  mutation selectCompany($company: Company!) {
    selectCompany(company: $company) @client {
      id,
    }
  }
`

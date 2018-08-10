import gql from 'graphql-tag'

export default gql`
  query {
    selectedCompany @client {
      id,
      name
    }
  }
`

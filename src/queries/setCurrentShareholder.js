import gql from 'graphql-tag'

export default gql`
  mutation setCurrentShareholder($id: String!) {
    setCurrentShareholder(id: $id) @client {
      id,
    }
  }
`

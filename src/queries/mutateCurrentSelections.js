import gql from 'graphql-tag'

export default gql`
  mutation($field: String!, $id: String!) {
    mutateCurrentSelections(field: $field, id: $id) @client {
      companyId
    }
  }
`

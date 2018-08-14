import gql from 'graphql-tag'

export default gql`
query($id: String!) {
  queryShareholder(id: $id) {
    id,
    name,
    companies {
      id,
      name
    }
  }
}`

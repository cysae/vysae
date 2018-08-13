import gql from 'graphql-tag'

export default gql`
query($id: String!) {
  getShareholder(id: $id) {
    id,
    name,
    companies {
      id,
      name,
      meetings {
        id,
        start,
        end
      }
    }
  }
}`

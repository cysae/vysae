import gql from 'graphql-tag'

export default gql`
query($id: String!, $withCompanies: Boolean = false) {
  queryShareholder(id: $id) {
    id,
    name,
    companies @include(if: $withCompanies) {
      id,
      name
    }
  }
}`

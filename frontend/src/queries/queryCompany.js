import gql from 'graphql-tag'

export default gql`
query ($id: String!) {
  queryCompany(id: $id) {
    id,
    name,
    meetings {
      id,
      start,
      end
      agreements {
        id,
        name
      }
    }
  }
}`

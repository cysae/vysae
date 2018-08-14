import gql from 'graphql-tag'

export default gql`
query($id: String!) {
  queryMeeting(id: $id) {
    id,
    agreements {
      id,
      name
    }
  }
}`

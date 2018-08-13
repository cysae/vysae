import gql from 'graphql-tag'

export default gql`
query Company {
  getCompany(id: "68aa3104-ea29-4767-9bec-600c8b76b37d") {
    id,
    name,
    meetings {
      id,
      start,
      end
    }
  }
}`

import gql from 'graphql-tag'

export default gql(`
query QueryGetUser(
  $nextToken: String
) {
  getUser {
    userId,
    companies(
      limit: 11,
      nextToken: $nextToken
    ) {
      items {
        companyId,
        name
      }
      nextToken
    }
  }
}
`)

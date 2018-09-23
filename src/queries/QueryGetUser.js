import gql from 'graphql-tag'

export default gql(`
query QueryGetUser(
  $limit: Int
  $nextToken: String
) {
  getUser {
    userId,
    companies(
      limit: $limit
      nextToken: $nextToken
    ) @connection (
      key: ["companies"]
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

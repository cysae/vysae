import gql from 'graphql-tag'

export default gql(`
  mutation MutationLinkShareholderWithUser(
    $shareholderId: ID!
    $user: UserInput!
  ) {
    linkShareholderWithUser (
      shareholderId: $shareholderId
      user: $user
    ) {
      userId
      username
      email
      phone_number
    }
  }
`)


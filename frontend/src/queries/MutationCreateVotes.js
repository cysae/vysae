import gql from 'graphql-tag'

export default gql(`
mutation createVotes($agreementId: ID! $votes: [VoteInput]!) {
  createVotes(
    agreementId: $agreementId
    votes: $votes
  ) {
    id,
    result
  }
}`)

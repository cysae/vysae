import gql from 'graphql-tag'

export default gql(`
mutation createVote(
  $vote: VoteInput!
) {
  createVote(
    vote: $vote
  ) {
    agreementId
    shareholderId
    result
  }
}
`)

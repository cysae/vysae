import gql from 'graphql-tag'

export default gql(`
mutation createVotesForAgreements($votesWithAgreementId: [VoteWithAgreementId!]!) {
  createVotesForAgreements(
    votesWithAgreementId: $votesWithAgreementId
  ) {
    id,
    votes {
      id,
      result
    }
  }
}
`)

import gql from 'graphql-tag'

export default gql`
  mutation ($agreementId: ID! $vote: VoteInput!) {
    createVote(
      agreementId: $agreementId
      vote: $vote
    ) {
      id,
      result
    }
  }
`

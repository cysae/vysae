import gql from 'graphql-tag'

export default gql`
  mutation mutateVote($agreementId: String!, $vote: VoteInput!) {
    mutateVote(agreementId: $agreementId, vote: $vote) {
      id,
      result
    }
  }
`

import gql from 'graphql-tag'

export default gql`
  mutation($agreementId: String!, $vote: VoteInput!) {
    mutateVote(agreementId: $agreementId, vote: $vote) {
      id,
      result
    }
  }
`

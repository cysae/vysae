import gql from 'graphql-tag'

export default gql`
  mutation($meetingId: String!, $agreement: AgreementInput!) {
    mutateAgreement(meetingId: $meetingId, agreement: $agreement) {
      id,
      name
    }
  }
`

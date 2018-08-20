import gql from 'graphql-tag'

export default gql`
  mutation($companyId: String!, $meeting: MeetingInput!) {
    mutateMeeting(companyId: $companyId, meeting: $meeting) {
      id
    }
  }
`

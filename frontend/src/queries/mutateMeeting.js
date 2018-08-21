import gql from 'graphql-tag'

export default gql`
  mutation mutateMeeting($companyId: String!, $meeting: MeetingInput!) {
    mutateMeeting(companyId: $companyId, meeting: $meeting) {
      id,
      start,
      end
    }
  }
`

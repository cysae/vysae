import gql from 'graphql-tag'

export default gql(`
  mutation (
    $companyId: ID!
    $meeting: MeetingInput!
  ) {
    createMeeting(
      companyId: $companyId
      meeting: $meeting
    ) {
      meetingId
      start
      end
      agreements {
        agreementId
        name
      }
    }
  }
`)


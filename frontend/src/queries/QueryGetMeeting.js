import gql from 'graphql-tag'

export default gql`
query QueryGetMeeting(
  $meetingId: ID!
) {
  getMeeting(meetinId: $meetingId) {
    meetingId
    agreements {
      agreementId
      name
    }
  }
}`

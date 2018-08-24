import gql from 'graphql-tag'

export default gql(`
  mutation ($companyId: ID! $meeting: MeetingInput!){
    createMeeting(
      companyId: $companyId
      meeting: $meeting
    ) {
      id
      start
      end
      agreements {
        id
        name
      }
    }
  }
`)

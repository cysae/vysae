import React, { Component } from 'react'
// graphql
import MutationCreateMeeting from '../queries/MutationCreateMeeting'
import queryCompany from '../queries/queryCompany'
import { graphql } from 'react-apollo'

class MeetingStatus extends Component {
  componentDidMount() {
    const { createMeeting, meeting } = this.props
    const companyId = meeting.company.id
    const meetingVar = {
      "start": meeting.start.toISOString(),
      "end": meeting.end.toISOString(),
    	"agreements": meeting.agreements
    }
    createMeeting(companyId, meetingVar)
  }

  render() {
    return <div>convocado</div>
  }
}

export default graphql(
  MutationCreateMeeting,
  {
    options: props => ({
      update: (proxy, { data: { loading, createMeeting } }) => {
        if (createMeeting !== null) {
          const query = queryCompany
          const variables = { id: props.meeting.company.id, withMeetings: true, withAgreements: true, withVotes: true }
          const data = proxy.readQuery({ query, variables })
          for (const agreementIndex in createMeeting.agreements) {
            createMeeting.agreements[agreementIndex].votes = []
          }
          data.queryCompany.meetings.push(createMeeting)

          proxy.writeQuery({ query, data, variables })
        }
      }
    }),
    props: (props) => ({
      createMeeting: (companyId, meeting) => props.mutate({
        variables: {
          companyId,
          meeting
        }
      })
    })
  }
)(MeetingStatus)

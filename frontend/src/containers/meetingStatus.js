import React, { Component } from 'react'
// graphql
import { compose, graphql } from 'react-apollo'

class MeetingStatus extends Component {
  componentDidMount() {
    const { mutateMeeting, meeting } = this.props
    console.log(meeting)
    const variables = {
      companyId: meeting.company.id,
      meeting: {
        start: meeting.start.toISOString(),
        end: meeting.end.toISOString(),
        agreements: meeting.agreements,
      }
    }
    console.log(variables)

    mutateMeeting({
      variables
    }).then(({data}) => console.log('got data', data))
    .catch(err => console.log(err))
  }

  render() {
    console.log(this.props)
    return <div>convocado</div>
  }
}


export default (MeetingStatus)

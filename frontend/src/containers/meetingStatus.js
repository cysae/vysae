import React, { Component } from 'react'
// antd
import { Spin } from 'antd'
// graphql
import { compose, graphql } from 'react-apollo'
import mutateMeeting from '../queries/mutateMeeting'

class MeetingStatus extends Component {
  componentDidMount() {
    const { mutateMeeting, meeting } = this.props
    mutateMeeting({
      variables: {
        companyId: 'Company-1234',
        meeting: {
          start: meeting.start,
          end: meeting.end,
          agreements: meeting.agreements,
        }
      }
    }).then(res => console.log(res))
    .catch(err => console.log(err))
  }

  render() {
    return <div>convocado</div>
  }
}

const MeetingStatusWithInfo = compose(
  graphql(mutateMeeting, { name: 'mutateMeeting' })
)(MeetingStatus)

export default (MeetingStatusWithInfo)

import React, { Component } from 'react'
// antd
import { Spin } from 'antd'
// graphql
import { compose, graphql } from 'react-apollo'

class MeetingStatus extends Component {
  componentDidMount() {
    this.updateDynamodb()
  }

  updateDynamodb() {
    const { company, meeting} = this.props
    const companyId = company.uuid

    this.props.addMeetingToCompany(meeting, companyId)
  }

  render() {
    if(this.props.meetingForm.isUpdating) {
      return <Spin />
    }

    return <div>convocado</div>
  }
}

const MeetingStatusWithInfo = compose(
  graphql(o)
)(MeetingStatus)

export default (MeetingStatusWithInfo)

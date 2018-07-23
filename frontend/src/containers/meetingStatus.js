import React, { Component } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import {
  requestCompanyUpdate,
  requestAddMeetingToCompany,
} from '../actions/index.js'

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

const mapStateToProps = state => {
  return {
    company: state.selectedCompany,
    meetingForm: state.meetingForm
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestCompanyUpdate: (companyId, body) => { dispatch(requestCompanyUpdate(companyId, body)) },
    addMeetingToCompany: (companyId, body) => { dispatch(requestAddMeetingToCompany(companyId, body)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingStatus)

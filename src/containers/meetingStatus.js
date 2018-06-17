import React, { Component } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import {
  requestCompanyUpdate,
  requestAddMeetingToCompany,
} from '../actions/index.js'

class MeetingStatus extends Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    this.updateDynamodb()
  }

  updateDynamodb() {
    console.log(this.props)
    const { requestCompanyUpdate, company, meeting} = this.props
    const companyId = company.uuid
    console.log(meeting)

    this.props.addMeetingToCompany(meeting, companyId)
  }

  render() {
    const { isLoading } = this.state
    if(isLoading) {
      return <Spin />
    }

    return <div>convocado</div>
  }
}

const mapStateToProps = state => {
  return {
    company: state.selectedCompany
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestCompanyUpdate: (companyId, body) => { dispatch(requestCompanyUpdate(companyId, body)) },
    addMeetingToCompany: (companyId, body) => { dispatch(requestAddMeetingToCompany(companyId, body)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingStatus)

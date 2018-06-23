import React, { Fragment } from 'react'
import { Table, Divider } from 'antd'
// redux
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { selectMeeting } from '../actions/index.js'
import moment from 'moment'
import { Link } from 'react-router-dom'

function NextMeetings(props) {
  const { meetings, selectMeeting } = props
  const meeting = meetings[0]

  const columns = [{
    title: 'Commienza',
    render: (text, record) => {
      const { votingStart } = record
      return (
        <span>{moment(votingStart).calendar()}</span>
      )
    }
  }, {
    title: 'Termina',
    render: (text, record) => {
      const { votingEnd } = record
      return (
        <span>{moment(votingEnd).calendar()}</span>
      )
    }
  }, {
    title: 'Tipo',
    dataIndex: 'meetingType',
    key: 'meetingType'
  }, {
    title: 'Acciones',
    key: 'action',
    render: (text, record) => (
      <Fragment>
        <Link to="/meetings/pdf" onClick={() => selectMeeting(meeting)}>Leer orden del día</Link>
        <Divider type="vertical"/>
        <Link to="/meetings/vote" onClick={() => selectMeeting(meeting)}>Votar</Link>
      </Fragment>
    )
  }]

  return (
    <Table columns={columns} rowKey='uuid' dataSource={meetings} />
  )
}

const getMeetings = state => state.selectedCompany.meetings
const getFutureMeetings = createSelector(
  [getMeetings],
  (meetings) => {
    return meetings.filter(meeting => {
      return moment(meeting.votingEnd).diff(moment()) > 0
    })
  }
)


const mapStateToProps = state => ({
    meetings: getFutureMeetings(state)
})
const mapDispatchToProps = dispatch => ({
  selectMeeting: meeting => dispatch(selectMeeting(meeting))
})

export default connect(mapStateToProps, mapDispatchToProps)(NextMeetings)

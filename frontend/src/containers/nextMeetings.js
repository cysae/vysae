import React, { Fragment } from 'react'
// antd
import { Table, Divider } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'

function NextMeetings(props) {
  console.log(this.props)
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
    {/* <Table columns={columns} rowKey='uuid' dataSource={meetings} /> */}
  )
}

export default NextMeetings

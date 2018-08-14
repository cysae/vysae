import React, { Fragment } from 'react'
// antd
import { Table, Divider } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'

function NextMeetings(props) {
  const { meetings, selectMeeting, mutateCurrentSelections } = props

  const columns = [{
    title: 'Commienza',
    key: 'start',
    render: (text, record) => {
      const { start } = record
      return (
        <span>{moment(start).calendar()}</span>
      )
    }
  }, {
    title: 'Termina',
    key: 'end',
    render: (text, record) => {
      const {end } = record
      return (
        <span>{moment(end).calendar()}</span>
      )
    }
  }, {
    title: 'Tipo',
    key: 'type'
  }, {
    title: 'Acciones',
    key: 'action',
    render: (text, record) => (
      <Fragment>
        {/* <Link to="/meetings/pdf" onClick={() => selectMeeting(record)}>Leer orden del día</Link> */}
        {/* <Divider type="vertical"/> */}
        <Link to="/meetings/vote" onClick={() => mutateCurrentSelections({
            field: 'meetingId',
            id: record.id
        })}>Votar</Link>
      </Fragment>
    )
  }]

  return (
    <Table
      columns={columns}
      rowKey='id'
      dataSource={meetings}
    />
  )
}

export default NextMeetings

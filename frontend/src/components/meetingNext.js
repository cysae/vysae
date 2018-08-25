import React, { Fragment } from 'react'
// antd
import { Table, Divider } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'

function MeetingNext(props) {
  const { meetings, selectMeeting } = props

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
    title: 'Acciones',
    key: 'action',
    render: (text, record) => (
      <Fragment>
        {/* <Link to="/meetings/pdf" onClick={() => selectMeeting(record)}>Leer orden del día</Link> */}
        <Link to={`/meetings/vote/${record.id}`} onClick={() => selectMeeting(record)}>Votar</Link>
        <Divider type="vertical"/>
        <Link to="/meetings/result" onClick={() => selectMeeting(record)}>Resultado</Link>
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

export default MeetingNext

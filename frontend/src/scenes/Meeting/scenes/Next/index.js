import React, { Fragment } from 'react'
// antd
import { Table, Divider } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
// services
import getCompany from '../../../../services/getCompany'

function MeetingNext(props) {
  const { company: { meetings: { items }}} = props
  const meetings = items

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
        <Link to={`/meetings/vote/${record.id}`}>Votar</Link>
        <Divider type="vertical"/>
        <Link to={`/meetings/result/${record.id}`}>Resultado</Link>
      </Fragment>
    )
  }]

  return (
    <Table
      columns={columns}
      rowKey='meetingId'
      dataSource={meetings}
    />
  )
}

export default getCompany(MeetingNext)

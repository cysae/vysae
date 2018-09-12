import React, { Fragment } from 'react'
// antd
import { Table, Divider } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
// services
import getCompany from '../../../../services/getCompany'
// components
import CreateMeetingDrawer from './components/CreateMeetingDrawer'

function Next(props) {
  const {
    company: { meetings: { items }},
    match: { params: { companyId }},
  } = props
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
        <Link to={`/${companyId}/meeting/${record.meetingId}/vote`}>Votar</Link>
        <Divider type="vertical"/>
        <Link to={`/${companyId}/meeting/${record.meetingId}/result`}>Resultado</Link>
      </Fragment>
    )
  }]

  return (
    <Fragment>
      <CreateMeetingDrawer companyId={companyId} />
      <Table
        columns={columns}
        rowKey='meetingId'
        dataSource={meetings}
      />
    </Fragment>
  )
}

export default getCompany(Next)

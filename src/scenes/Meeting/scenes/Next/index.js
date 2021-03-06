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
    company: {
      meetings,
      majorities
    },
    match: { params: { companyId }},
    getCompany: { createMeeting }
  } = props

  const columns = [{
    title: 'Convocante',
    dataIndex: 'name',
  }, {
    title: 'Comienza',
    key: 'start',
    render: (text, record) => {
      const { start } = record
      return (
        <span>{moment(start).calendar()}</span>
      )
    }
  }, {
    title: 'Finaliza',
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
        <Link to={`/${companyId}/meeting/${record.id}/orderDay`}>Orden del día</Link>
        <Divider type="vertical"/>
        <Link to={`/${companyId}/meeting/${record.id}/vote`}>Votar</Link>
        <Divider type="vertical"/>
        <Link to={`/${companyId}/meeting/${record.id}/agreement`}>Acta</Link>
      </Fragment>
    )
  }]

  const agreements = [].concat(...majorities.items.map((majority) => {
    return majority.agreements.items
  }))

  return (
    <Fragment>
      <CreateMeetingDrawer agreements={agreements} createMeeting={createMeeting} />
      <Table
        columns={columns}
        rowKey='id'
        dataSource={meetings.items}
      />
    </Fragment>
  )
}

export default getCompany(Next)

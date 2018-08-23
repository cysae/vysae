import React, { Fragment } from 'react'
// antd
import { Table } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
// GraphQL
import { graphql } from 'react-apollo'
import queryCompany from '../queries/queryCompany'

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
        {/* <Divider type="vertical"/> */}
        <Link to="/meetings/vote" onClick={() => selectMeeting(record)}>Votar</Link>
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

import React, { Fragment } from 'react'
// antd
import { Table } from 'antd'
// graphql
import { compose } from 'react-apollo'
// services
import getCompany from '../../../../services/getCompany'
// components
import CreateShareholderDrawer from './components/CreateShareholderDrawer'
import LinkShareholderWithUserDrawer from './components/LinkShareholderWithUserDrawer'

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => {
    if (record.userId !== null)
      return (
        <span>is linked</span>
      )

    return (
      <span>
        <LinkShareholderWithUserDrawer shareholderId={record.shareholderId} />
      </span>
    )
  }
}];

const Shareholders = ({ company: { shareholders: { items }}}) => {
  const shareholders = items
  console.log(shareholders)

  return (
    <Fragment>
      <CreateShareholderDrawer />
      <Table columns={columns} dataSource={shareholders} rowKey='shareholderId' />
    </Fragment>
  )
}

export default getCompany(Shareholders)

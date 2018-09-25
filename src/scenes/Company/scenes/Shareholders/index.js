import React, { Fragment } from 'react'
/*eslint-disable no-script-url*/
// antd
import { Table } from 'antd'
// services
import getCompany from '../../../../services/getCompany'
// components
import CreateShareholderDrawer from './components/CreateShareholderDrawer'
import LinkShareholderWithUserDrawer from './components/LinkShareholderWithUserDrawer'
import ShareIntervalTable from './components/ShareIntervalTable'


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


const Shareholders = (props) => {
  const {
    company: { shareholders },
    match: { params: { companyId }},
    getCompany: { createShareholder }
  } = props

  return (
    <Fragment>
      <CreateShareholderDrawer companyId={companyId} createShareholder={createShareholder} />
      <Table
        columns={columns}
        dataSource={shareholders.items}
        rowKey='id'
        expandedRowRender={(record) => <ShareIntervalTable shareholder={record} />}
      />
    </Fragment>
  )
}

export default getCompany(Shareholders)

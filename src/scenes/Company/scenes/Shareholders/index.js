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




const Shareholders = (props) => {
  const {
    company: { shareholders },
    match: { params: { companyId }},
    getCompany: { createShareholder, linkShareholder }
  } = props

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      if (record.user === null)
        return (
          <span>
            <LinkShareholderWithUserDrawer
              shareholder={record}
              linkShareholder={linkShareholder}
            />
          </span>
        )

      return (
        <span>is linked</span>
      )
    }
  }];

  return (
    <Fragment>
      <CreateShareholderDrawer
        companyId={companyId}
        createShareholder={createShareholder}
      />
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

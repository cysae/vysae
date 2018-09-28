import React, { Fragment } from 'react'
/*eslint-disable no-script-url*/
// antd
import { Table, message } from 'antd'
// services
import getCompany from '../../../../services/getCompany'
// components
import CreateShareholderDrawer from './components/CreateShareholderDrawer'
import ShareIntervalTable from './components/ShareIntervalTable'
// amplify
import { API } from 'aws-amplify'

const sendInvitation = (email, companyId, shareholderId) => {
  const hideLoadingMsg = message.loading('loading', 0)
  API.post('linkShareholder', '/linkShareholder', { body: {
    email, companyId, shareholderId
  }}).then((res) => {
      console.log(res)
      message.success('Invitacion enviado.')
    }).catch(err => {
      console.error(err)
      message.error('No podia enviar la invitacion')
    }).finally(() => hideLoadingMsg())
}

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
      if (!record.user)
        return (
          <button
            type="primary"
            onClick={() => sendInvitation('dirkhornung91@gmail.com', companyId, record.id)}
          >
            Enviar Invitacion
          </button>
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

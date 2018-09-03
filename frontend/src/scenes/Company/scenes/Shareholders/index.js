import React, { Fragment } from 'react'
// antd
import { Table } from 'antd'
// graphql
import { compose, graphql } from 'react-apollo'
import QueryGetCompany from '../../../../queries/QueryGetCompany'
// services
import renderWhileLoading from '../../../../services/renderWhileLoading'
import renderIfError from '../../../../services/renderIfError'
// components
import Loading from '../../../../components/Loading'
import Error from '../../../../components/Error'
import CreateShareholderDrawer from './components/CreateShareholderDrawer'
import LinkShareholderWithUserDrawer from './components/LinkShareholderWithUserDrawer'

function hasUsers(shareholder) {
  return shareholder.users.items[0] !== null
}

const columns = [{
  title: 'ID',
  dataIndex: 'shareholderId',
  key: 'shareholderId',
}, {
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => {
    if (hasUsers(record))
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

const Shareholders = ({ errors, company }) => {
  const shareholders = company && company.shareholders && company.shareholders.items
  console.log(shareholders)

  return (
    <Fragment>
      <CreateShareholderDrawer />
      {shareholders[0] !== null && (
         <Table columns={columns} dataSource={shareholders} rowKey='shareholderId' />
      )}
    </Fragment>
  )
}

export default compose(
  graphql(
    QueryGetCompany, {
      options: (props) => ({
        fetchPolicy: 'network-only',
        variables: {
          companyId: props.match.params.companyId,
          withShareholders: true,
          withShareholdersUsers: true,
        },
      }),
      props: ( { data: { error, loading, getCompany} } ) => ({
        loading,
        error,
        company: getCompany,
      })
    },
  ),
  renderWhileLoading(Loading),
  renderIfError(Error),
)(Shareholders)

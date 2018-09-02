import React, { Fragment } from 'react'
// antd
import { Table } from 'antd'
// graphql
import { compose, graphql } from 'react-apollo'
import QueryGetCompany from '../../../../queries/QueryGetCompany'
import MutationLinkShareholderWithUser from '../../../../queries/MutationLinkShareholderWithUser'
// services
import renderWhileLoading from '../../../../services/renderWhileLoading'
// components
import Loading from '../../../../components/Loading'
import CreateShareholderDrawer from './components/CreateShareholderDrawer'
import LinkShareholderWithUserDrawer from './components/LinkShareholderWithUserDrawer'

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
  render: (text, record) => (
    <span>
      <LinkShareholderWithUserDrawer shareholderId={record.shareholderId} />
    </span>
  )
}];

const Shareholders = ({ data, company, error, loading }) => {
  const shareholders = company && company.shareholders && company.shareholders.items

  return (
    <Fragment>
      <CreateShareholderDrawer />
      <Table columns={columns} dataSource={shareholders} rowKey='shareholderId' />
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
          withShareholders: true
        },
      }),
      props: ({ data: { loading, error, getCompany } }) => ({
        loading,
        error,
        company: getCompany,
      })
    },
  ),
  renderWhileLoading(Loading)
)(Shareholders)

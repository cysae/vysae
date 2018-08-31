import React, { Fragment } from 'react'
// antd
import { Spin, Table } from 'antd'
// graphql
import { compose, graphql } from 'react-apollo'
import QueryGetCompany from '../../../../queries/QueryGetCompany'
// services
import renderWhileLoading from '../../../../services/renderWhileLoading'
// components
import Loading from '../../../../components/Loading'
import CreateShareholderForm from './components/CreateShareholderDrawer'

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
}];

const Shareholders = ({ isLoading, company }) => {
  if (isLoading)
    return (<Spin size="large" />)

  const { shareholders: { items } } = company

  return (
    <Fragment>
      <CreateShareholderForm />
      <Table columns={columns} dataSource={items} rowKey='shareholderId' />
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
      props: ({ data: { error, loading, getCompany } }) => ({
        loading,
        error,
        company: getCompany
      })
    },
    renderWhileLoading(Loading)
  ),
)(Shareholders)

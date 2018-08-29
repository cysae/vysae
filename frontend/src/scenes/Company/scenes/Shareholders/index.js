import React, { Fragment } from 'react'
// antd
import { Spin, Table } from 'antd'
// graphql
import { compose, graphql } from 'react-apollo'
import QueryGetCompany from '../../../../queries/QueryGetCompany'
import queryCurrentSelections from '../../../../queries/queryCurrentSelections'
// components
import CreateShareholderForm from './components/CreateShareholderDrawer'

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
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
  /* if (isLoading)
   *   return (<Spin size="large" />) */

  /* const { shareholders } = company */

  return (
    <Fragment>
      test
      {/* <CreateShareholderForm /> */}
      {/* <Table columns={columns} dataSource={shareholders} /> */}
    </Fragment>
  )
}

export default compose(
  graphql(queryCurrentSelections, {
    props: ({ data: { loading, currentSelections: { companyId, shareholderId } } }) => ({
      isLoading: loading,
      currentCompanyId: companyId,
      currentShareholderId: shareholderId
    })
  }),
  graphql(QueryGetCompany, {
    options: (props) => ({
      variables: {
        id: props.currentCompanyId,
        withShareholders: true
      }
    }),
    props: ({ data: { loading, getCompany } }) => ({
      isCompanyLoading: loading,
      company: getCompany,
    })
  }),
)(Shareholders)

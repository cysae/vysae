import React, { Component } from 'react'
import styled from 'styled-components'
import { Table, Button } from 'antd'
// AppSync
import queryShareholder from './queries/queryShareholder'
import querySelectedCompany from './queries/querySelectedCompany'
import SelectCompany from './queries/selectCompany'
import { graphql, compose } from 'react-apollo';

const MyTable = styled(Table)`
  .selectedRow {
    background-color: #e7f7ff;
  }
`

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.getSelectedRow = this.getSelectedRow.bind(this)
  }

  componentDidMount() {
    /* this.props.requestMyCompanies() */
    /* const companyId = '81291d0e-ac65-44a2-b946-ff83104e4260' */
    /* this.props.requestCompanySelection(companyId) */
  }

  getSelectedRow(record, index) {
    if(record.id === this.props.selectedCompany.id) {
      return 'selectedRow'
    }
    return ''
  }

  render() {
    const {
      shareholder, isShareholderLoading, isSelectedCompanyLoading,
      selectCompany
    } = this.props

    if(isShareholderLoading || isSelectedCompanyLoading) {
      return <div>Loading...</div>
    }

    const { companies } = shareholder

    const columns = [{
      title: 'Nombre de la sociedad',
      dataIndex: 'name',
    }, {
      title: 'Acciones',
      dataIndex: 'id',
      render: (text, record) =>(
        <Button onClick={() => selectCompany({
          variables: {
            company: record,
          },
        })}>
          Seleccionar
        </Button>
      ),
    }];

    return (
      <MyTable
        rowClassName={this.getSelectedRow}
        rowKey="id"
        columns={columns}
        dataSource={companies}
      />
    )
  }
}

const DashboardWithData = compose(
  graphql(queryShareholder, {
    options: {
      variables: {
        id: 'Shareholder-e199e636-5cff-4293-94c4-3e2e996a6ea8'
      },
      fetchPolicy: 'cache-and-network'
    },
    props: ({ data: { loading, getShareholder } }) => ({
      isShareholderLoading: loading,
      shareholder: getShareholder,
    })
  }),
  graphql(querySelectedCompany, {
    props: ({ data: { loading, selectedCompany } }) => ({
      isSelectedCompanyLoading: loading,
      selectedCompany,
    })
  }),
  graphql(SelectCompany, { name: 'selectCompany' })
)(Dashboard)

export default DashboardWithData

import React, { Component } from 'react'
import styled from 'styled-components'
import { Table, Button } from 'antd'
// AppSync
import ShareholderQuery from './queries/shareholderQuery.js'
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
    /* if(record.id === this.props.selectedCompany.id) {
     *   return 'selectedRow'
     * } */
    return ''
  }

  render() {
    console.log(this.props)
    const { shareholder, isLoading } = this.props

    if(isLoading) {
      return <div>Loading...</div>
    }

    const { companies } = shareholder

    const columns = [{
      title: 'Nombre de la sociedad',
      dataIndex: 'name',
    }, {
      title: 'Acciones',
      dataIndex: 'id',
      render: (text, record) => (
        <Button  onClick={() => this.props.requestCompanySelection(record.uuid)}>
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
  graphql(ShareholderQuery, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: (props) => ({
      isLoading: props.data.loading,
      shareholder: props.data.getShareholder,
    })
  }),
)(Dashboard);

export default DashboardWithData;

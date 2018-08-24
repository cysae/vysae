import React, { Component } from 'react'
import styled from 'styled-components'
import { Table, Button } from 'antd'
// AppSync
import QueryGetShareholder from './queries/QueryGetShareholder'
import queryCurrentSelections from './queries/queryCurrentSelections'
import mutateCurrentSelections from './queries/mutateCurrentSelections'
import { graphql, compose } from 'react-apollo'

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

  getSelectedRow(record, index) {
    if(record.id === this.props.currentCompanyId) {
      return 'selectedRow'
    }
    return ''
  }

  render() {
    const {
      shareholder, isShareholderLoading, isCurrentSelectionLoading,
        mutateCurrentSelections
    } = this.props

    if(isShareholderLoading || isCurrentSelectionLoading) {
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
          <Button onClick={() => mutateCurrentSelections({
              variables: {
                field: 'companyId',
                id: record.id
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
  graphql(QueryGetShareholder, {
    props: ({ data: { loading, getShareholder} }) => ({
      isShareholderLoading: loading,
      shareholder: getShareholder,
    })
  }),
  graphql(queryCurrentSelections, {
    props: ({ data: { loading, currentSelections: { companyId }} }) => ({
      isCurrentSelectionLoading: loading,
      currentCompanyId: companyId
    })
  }),
  graphql(mutateCurrentSelections, { name: 'mutateCurrentSelections' }),
)(Dashboard)

export default DashboardWithData

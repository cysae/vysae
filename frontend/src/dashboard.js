import React, { Component } from 'react'
import styled from 'styled-components'
import { Table, Button } from 'antd'
// AppSync
import QueryGetShareholder from './queries/QueryGetShareholder'
import queryCurrentSelections from './queries/queryCurrentSelections'
import mutateCurrentSelections from './queries/mutateCurrentSelections'
import MutationCreateCompany from './queries/MutationCreateCompany'
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
    options: {
      fetchPolicy: 'network-only',
    },
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
  graphql(
    MutationCreateCompany,
    {
      options: props => ({
        update: (proxy, { data }) => {
          console.log(data)
        }
      }),
      props: (props) => ({
        createCompany: (name) => props.mutate({
          variables: {
            name
          }
        })
      })
    }
  )
)(Dashboard)

export default DashboardWithData

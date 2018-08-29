import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Table, Button, Spin, message } from 'antd'
// AppSync
import QueryGetUser from '../../queries/QueryGetUser'
import queryCurrentSelections from '../../queries/queryCurrentSelections'
import mutateCurrentSelections from '../../queries/mutateCurrentSelections'
import { graphql, compose } from 'react-apollo'
// Components
import CreateCompanyDrawer from './components/CreateCompanyDrawer'

const MyTable = styled(Table)`
  .selectedRow {
    background-color: #e7f7ff;
  }
`

class Companies extends Component {
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

  handleTableChange = async (pagination, filters, sorter) => {
    if ( this.props.user.companies.nextToken !== null ) {
      const hide = message.loading('Cargando datos', 0)
      await this.props.fetchMore()
      hide()
    }
  }

  render() {
    const {
      user, isUserLoading, error, isCurrentSelectionLoading,
        mutateCurrentSelections
    } = this.props

    if(isUserLoading || isCurrentSelectionLoading) {
      return <Spin size="large" />
    }


    if( error ) {
      console.log('Error', error)
      return (<div>Error</div>)
    }

    const companies = user.companies.items

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
      <Fragment>
        <CreateCompanyDrawer />
        <MyTable
          rowClassName={this.getSelectedRow}
          rowKey="companyId"
          columns={columns}
          dataSource={companies}
          onChange={this.handleTableChange}
        />
      </Fragment>
    )
  }
}

const CompaniesWithData = compose(
  graphql(QueryGetUser, {
    options: {
      fetchPolicy: 'network-only'
    },
    props: ({ data: { error, loading, getUser, fetchMore } }) => ({
      isUserLoading: loading,
      error,
      user: getUser,
      fetchMore: () => fetchMore({
        variables: {
          nextToken: getUser ? getUser.companies.nextToken : null
        },
        updateQuery: (previousResult, { fetchMoreResult, variables }) => {
          // concat companies
          const items = previousResult.getUser.companies.items.concat(
            fetchMoreResult.getUser.companies.items
          )

          fetchMoreResult.getUser.companies.nextToken
          return {
            getUser: {
              ...fetchMoreResult.getUser,
              companies: {
                ...fetchMoreResult.getUser.companies,
                items,
              }
            },
          }
        }
      })
    })
  }),
  graphql(queryCurrentSelections, {
    props: ({ data: { loading, currentSelections: { companyId }} }) => ({
      isCurrentSelectionLoading: loading,
      currentCompanyId: companyId
    })
  }),
  graphql(mutateCurrentSelections, { name: 'mutateCurrentSelections' }),
)(Companies)

export default CompaniesWithData

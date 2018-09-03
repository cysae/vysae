import React, { Component, Fragment } from 'react'
import { Table, Button, Spin, message } from 'antd'
// AppSync
import QueryGetUser from '../../queries/QueryGetUser'
import { graphql, compose } from 'react-apollo'
// Components
import CreateCompanyDrawer from './components/CreateCompanyDrawer'

class Companies extends Component {
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
      handleSelectCompanyId
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
          <Button onClick={
            () => handleSelectCompanyId( record.companyId )
          }>
            Seleccionar
          </Button>
        ),
    }];

    return (
      <Fragment>
        <CreateCompanyDrawer />
        { companies[0] !== null && (
            <Table
              rowKey="companyId"
              columns={columns}
              dataSource={companies}
              onChange={this.handleTableChange}
            />
        )}
      </Fragment>
    )
  }
}

const CompaniesWithData = compose(
  graphql(QueryGetUser, {
    /* options: {
     *   fetchPolicy: 'network-only'
     * }, */
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
)(Companies)

export default CompaniesWithData

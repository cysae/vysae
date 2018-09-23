import React, { Component, Fragment } from 'react'
import { Table, Button } from 'antd'
// services
import getUser from '../../services/getUser'
// Components
import CreateCompanyDrawer from './components/CreateCompanyDrawer'

/* addUserIdToCognitoUser() */
class Companies extends Component {
  state = {
    pagination: 1
  }

  handleTableChange = (pagination) => {
    if(pagination && pagination.current > this.state.pagination) {
      this.props.fetchMoreCompanies()
      this.setState({ pagination: pagination.current })
    }
  }

  render() {
    const {
      user, handleSelectCompanyId
    } = this.props
    const companies = user.companies.items.map(company => company.company)

    const columns = [{
      title: 'Nombre de la sociedad',
      dataIndex: 'name',
    }, {
      title: 'Acciones',
      dataIndex: 'id',
      render: (text, record) =>(
        <Button onClick={
          () => handleSelectCompanyId( record.id )
        }>
          Seleccionar
        </Button>
      ),
    }];

    return (
      <Fragment>
        <CreateCompanyDrawer userId={user.id} />
        <Table
          rowKey="id"
          columns={columns}
          dataSource={companies}
          onChange={this.handleTableChange}
        />
      </Fragment>
    )
  }
}

export default getUser(Companies)

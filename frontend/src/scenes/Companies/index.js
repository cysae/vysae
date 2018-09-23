import React, { Component, Fragment } from 'react'
import { Table, Button, message } from 'antd'
// services
import getUser from '../../services/getUser'
// Components
import CreateCompanyDrawer from './components/CreateCompanyDrawer'

/* addUserIdToCognitoUser() */
class Companies extends Component {
  handleTabChange() {

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
          () => handleSelectCompanyId( record.companyId )
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
        <Button onClick={this.props.fetchMore}>fetch</Button>
      </Fragment>
    )
  }
}

export default getUser(Companies)

import React, { Component, Fragment } from 'react'
import { Table, Button, message } from 'antd'
// services
import getUser from '../../services/getUser'
// Components
import CreateCompanyDrawer from './components/CreateCompanyDrawer'

/* addUserIdToCognitoUser() */
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
    console.log(user)

    return (
      <Fragment>
        <CreateCompanyDrawer userId={user.id} />
        { companies[0] !== null && (
            <Table
              rowKey="id"
              columns={columns}
              dataSource={companies}
              onChange={this.handleTableChange}
            />
        )}
      </Fragment>
    )
  }
}

export default getUser(Companies)

import React, { Component, Fragment } from 'react'
import { Table, Button, message } from 'antd'
// Amplify
import Amplify, { API, graphqlOperation } from "aws-amplify"
import aws_config from "../../aws-exports";
import { GetUser } from '../../graphql/queries.js'
import { print as gqlToString } from 'graphql/language'
// AppSync
import QueryGetUser from '../../queries/QueryGetUser'
import { graphql, compose } from 'react-apollo'
import getUser from '../../services/getUser'
/* import addUserIdToCognitoUser from '../../services/addUserIdtoCognitoUser' */
// Components
import CreateCompanyDrawer from './components/CreateCompanyDrawer'
Amplify.configure(aws_config);

/* addUserIdToCognitoUser() */
class Companies extends Component {
  handleTableChange = async (pagination, filters, sorter) => {
    if ( this.props.user.companies.nextToken !== null ) {
      const hide = message.loading('Cargando datos', 0)
      await this.props.fetchMore()
      hide()
    }
  }

  /* componentDidMount = async () => {
   *   console.log(GetUser)
   *   const companies = await API.graphql(
   *     graphqlOperation(gqlToString(GetUser), { id: '3310d472-a8e6-4978-8c9d-bb947d45c689'})
   *   )
   *   console.log(companies)
   * } */

  render() {
    const {
      user, handleSelectCompanyId
    } = this.props
    console.log(this.props)

    return (<div>strange</div>)

    /* const companies = user.companies.items

     * const columns = [{
     *   title: 'Nombre de la sociedad',
     *     dataIndex: 'name',
     * }, {
     *   title: 'Acciones',
     *     dataIndex: 'id',
     *     render: (text, record) =>(
     *       <Button onClick={
     *         () => handleSelectCompanyId( record.companyId )
     *       }>
     *         Seleccionar
     *       </Button>
     *     ),
     * }];
     * console.log(this.props)

     * return (
     *   <Fragment>
     *     <CreateCompanyDrawer />
     *     { companies[0] !== null && (
     *         <Table
     *           rowKey="companyId"
     *           columns={columns}
     *           dataSource={companies}
     *           onChange={this.handleTableChange}
     *         />
     *     )}
     *   </Fragment>
     * ) */
  }
}

export default getUser(Companies)

import React, { Component } from 'react'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import aws_exports from './aws-exports.js'
// Redux
import { connect } from 'react-redux'
import {
  requestSignedInUser,
} from './actions/index.js'
// Router
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
// Antd
import { Layout, Menu, Breadcrumb } from 'antd'
// Components
import SelectCompanyRoute from './selectedCompanyRoute.js'
import Dashboard from './dashboard'
import AddCompany from './containers/addCompany'
import Info from './components/info'
import Meetings from './components/meetings'

import './App.css'
Amplify.configure(aws_exports)
const { Header, Content, Footer } = Layout;

class App extends Component {
  componentDidMount() {
    this.props.requestSignedInUser()
  }

  render() {
    return (
      <Layout>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="dashboard"><Link to="/">Dashboard</Link></Menu.Item>
            <Menu.Item key="info"><Link to="/info/company">Info</Link></Menu.Item>
            <Menu.Item key="meetings"><Link to="/meetings/next">Juntas</Link></Menu.Item>
            <Menu.Item key="addCompany"><Link to="/añadirSociedad">Añadir Sociedad</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Añadir sociedad</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/añadirSociedad" component={AddCompany}/>
            <SelectCompanyRoute path="/info" component={Info}/>
            <SelectCompanyRoute path="/meetings" component={Meetings}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Vysae ©2018
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    signedInUser: state.signedInUser
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestSignedInUser: () => {dispatch(requestSignedInUser())},
  }
}

export default withAuthenticator(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)))

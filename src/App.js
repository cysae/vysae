import React, { Component } from 'react'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import aws_exports from './aws-exports.js'
// Router
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
// Antd
import { Layout, Menu, Breadcrumb } from 'antd'

// Components
import Dashboard from './dashboard'
import AddCompany from './components/addCompany'
import Info from './components/info'
import Meetings from './components/meetings'

import './App.css'
Amplify.configure(aws_exports)
const { Header, Content, Footer } = Layout;

class App extends Component {
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
            <Route path="/info" component={Info}/>
            <Route path="/meetings" component={Meetings}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Vysae ©2018
        </Footer>
      </Layout>
    );
  }
}

export default withAuthenticator(App)

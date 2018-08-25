import React, { Component } from 'react'
import Amplify, { Auth } from 'aws-amplify'
// antd
import { Layout, Row, Col, Button, Menu } from 'antd'
// Router
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
// Components
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);
const { Header } = Layout

class RawHeaderMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    switch(pathname.substr(0, 5)) {
      case '/': return ['dashboard']
      case '/info': return ['info']
      case '/meet': return ['meetings']
      case '/añad': return ['addCompany']
      default: return ['dashboard']
    }
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={this.getSelectedKey()}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="dashboard"><Link to="/">Dashboard</Link></Menu.Item>
        <Menu.Item key="info"><Link to="/info/company">Info</Link></Menu.Item>
        <Menu.Item key="meetings"><Link to="/meetings/next">Juntas</Link></Menu.Item>
        <Menu.Item key="addCompany"><Link to="/añadirSociedad">Añadir Sociedad</Link></Menu.Item>
      </Menu>
    )
  }
}
const HeaderMenu = withRouter(RawHeaderMenu)

class MyHeader extends Component {
  constructor(props) {
    super(props)
    this.signOut = this.signOut.bind(this)
  }

  async signOut() {
    console.log('test')
    await Auth.signOut()
    this.props.client.resetStore()
    window.location.href = '/'
  }

  render() {
    return(
      <Header>
        <Row type="flex" justify="space-between">
          <Col>
            <div className="logo" />
            <HeaderMenu />
          </Col>
          <Col>
            <Button onClick={this.signOut}>Log out</Button>
          </Col>
        </Row>
      </Header>
    )
  }
}

export default withRouter(MyHeader)

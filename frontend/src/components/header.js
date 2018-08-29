import React, { Component } from 'react'
// antd
import { Layout, Row, Col, Button, Menu } from 'antd'
// Router
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
// Components
const { Header } = Layout

class RawHeaderMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    const companyIndex = pathname.indexOf('/', 1)

    switch(pathname.substr(companyIndex, pathname.length)) {
      case '/': return ['companies']
      case '/dashboard': return ['dashboard']
      case '/company': return ['company']
      case '/info': return ['info']
      case '/meet': return ['meetings']
      case '/añad': return ['addCompany']
      default: return ['dashboard']
    }
  }

  render() {
    const { companyId } = this.props

    return (
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={this.getSelectedKey()}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="dashboard"><Link to={`/${companyId}/dashboard`}>Dashboard</Link></Menu.Item>
        <Menu.Item key="company"><Link to={`/${companyId}/company`}>Company</Link></Menu.Item>
        <Menu.Item key="info"><Link to="/info/company">Info</Link></Menu.Item>
        <Menu.Item key="meetings"><Link to="/meetings/next">Juntas</Link></Menu.Item>
        <Menu.Item key="addCompany"><Link to="/añadirSociedad">Añadir Sociedad</Link></Menu.Item>
      </Menu>
    )
  }
}

const HeaderMenu = withRouter(RawHeaderMenu)

class MyHeader extends Component {
  render() {
    const { companyId, handleSignOut } = this.props

    return(
      <Header>
        <Row type="flex" justify="space-between">
          <Col>
            <div className="logo" />
            <HeaderMenu companyId={companyId} />
          </Col>
          <Col>
            <Button onClick={handleSignOut}>Log out</Button>
          </Col>
        </Row>
      </Header>
    )
  }
}

export default withRouter(MyHeader)

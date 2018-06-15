import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class RawHeaderMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    switch(pathname.substr(0, 5)) {
      case '/': return 'dashboard'
      case '/info': return 'info'
      case '/meet': return 'meetings'
      case '/añad': return 'addCompany'
      default: return 'dashboard'
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
export const HeaderMenu = withRouter(RawHeaderMenu)

class RawInfoMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    switch(pathname) {
      case '/info/company': return 'company'
      case '/info/profile': return 'profile'
      case '/info/voting-system': return 'votingSystem'
      case '/info/shareholder-registry': return 'shareholderRegistry'
      default: return 'company'
    }
  }

  render() {
    return (
      <Menu
        selectedKeys={this.getSelectedKey()}
      >
        <Menu.Item key="company">
          <Link to='/info/company'>Empresa</Link>
        </Menu.Item>
        {/* <Menu.Item key="profile">
            <Link to='/info/profile'>Perfil</Link>
            </Menu.Item>
            <Menu.Item key="votingSystem">
            <Link to='/info/voting-system'>Sistema de votación</Link>
            </Menu.Item>
            <Menu.Item key="shareholderRegistry">
            <Link to='/info/shareholder-registry'>Libro de socios</Link>
            </Menu.Item> */}
      </Menu>
    )
  }
}
export const InfoMenu = withRouter(RawInfoMenu)

import React, { Component } from 'react'
import { Row, Col } from 'antd'
// router
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
// components
import Company from '../containers/company.js'
import Profile from './profile.js'
import VotingSystem from './votingSystem.js'
import ShareholderRegister from './shareholderRegister.js'
// antd
import { Menu } from 'antd'

class RawInfoMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    switch(pathname) {
      case '/info/company': return ['company']
      case '/info/profile': return ['profile']
      case '/info/voting-system': return ['votingSystem']
      case '/info/shareholder-registry': return ['shareholderRegistry']
      default: return ['company']
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
const InfoMenu = withRouter(RawInfoMenu)

export default class Info extends Component {
  render() {
    const { selectedCompany } = this.props

    return (
      <Row type="flex">
        <Col span={4}>
          <InfoMenu />
        </Col>
        <Col span={20}>
          <Route path="/info/company" render=
            {props =>
              <Company selectedCompany={selectedCompany} />
            }
          />
          <Route path="/info/profile" component={Profile} />
          <Route path="/info/voting-system" component={VotingSystem} />
          <Route path="/info/shareholder-registry" component={ShareholderRegister} />
        </Col>
      </Row>
    )
  }
}

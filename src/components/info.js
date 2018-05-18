import React, { Component } from 'react'
import { Row, Col, Menu } from 'antd'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import Company from './company.js'
import { Profile } from './shareholder.js'
import VotingSystem from './votingSystem.js'
import ShareholderRegister from './shareholderRegister.js'

export default class Info extends Component {
  render() {
    return (
      <Row type="flex">
        <Col span={4}>
          <Menu>
            <Menu.Item key="company">
              <Link to='/info/company'>Empresa</Link>
            </Menu.Item>
            <Menu.Item key="profile">
              <Link to='/info/profile'>Perfil</Link>
            </Menu.Item>
            <Menu.Item key="votingSystem">
              <Link to='/info/voting-system'>Sistema de votación</Link>
            </Menu.Item>
            <Menu.Item key="shareholderRegistry">
              <Link to='/info/shareholder-registry'>Libro de socios</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={20}>
          <Route path="/info/company" component={Company} />
          <Route path="/info/profile" component={Profile} />
          <Route path="/info/voting-system" component={VotingSystem} />
          <Route path="/info/shareholder-registry" component={ShareholderRegister} />
        </Col>
      </Row>
    )
  }
}

import React, { Component } from 'react'
import { Row, Col, Menu } from 'antd'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import Company from './company.js'

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
          </Menu>
        </Col>
        <Col span={20}>
          <Route path="/info/company" component={Company} />
          <Route path="/info/profile" component={Company} />
        </Col>
      </Row>
    )
  }
}

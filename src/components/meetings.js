import React, { Component } from 'react'
import { Row, Col, Menu } from 'antd'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import Company from './company.js'

export default class Meetings extends Component {
  render() {
    return (
      <Row type="flex">
        <Col span={4}>
          <Menu>
            <Menu.Item key="next">
              <Link to='/meetings/next'>Próxima Junta</Link>
            </Menu.Item>
            <Menu.Item key="announce">
              <Link to='/meetings/announce'>Convocatoria</Link>
            </Menu.Item>
            <Menu.Item key="history">
              <Link to='/meetings/history'>Historial de Juntas</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={20}>
          <Route path="/meetings/next" component={Company} />
        </Col>
      </Row>
    )
  }
}

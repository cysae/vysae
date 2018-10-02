import React, { Component } from 'react'
// antd
import { Menu, Row, Col } from 'antd'
// react-router
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
// scenes
import Shareholders from './scenes/Shareholders'
import Basics from './scenes/Basics'
import Shares from './scenes/Shares'
import Majorities from './scenes/Majorities'

class CompanyMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props
    const companyIndex = pathname.indexOf('/', 1)

    switch(pathname.substr(companyIndex, pathname.length)) {
      case '/company/basics': return ['basics']
      case '/company/shares': return ['shares']
      case '/company/shareholders': return ['shareholders']
      case '/company/majorities': return ['majorities']
      default: return ['basics']
    }
  }

  render() {
    const { companyId } = this.props

    return(
      <Menu
        selectedKeys={this.getSelectedKey()}
      >
        <Menu.Item key="basics">
          <Link to={`/${companyId}/company/basics`}>Información Básica</Link>
        </Menu.Item>
        <Menu.Item key="shares">
          <Link to={`/${companyId}/company/shares`}>Participaciones</Link>
        </Menu.Item>
        <Menu.Item key="shareholders">
          <Link to={`/${companyId}/company/shareholders`}>Socios</Link>
        </Menu.Item>
        <Menu.Item key="majorities">
          <Link to={`/${companyId}/company/majorities`}>Mayorías</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default (props) => {
  const {
    match: { params: { companyId }},
    location: { pathname },
  } = props

  return (
    <Row type="flex">
      <Col span={4}>
        <CompanyMenu companyId={companyId} pathname={pathname} />
      </Col>
      <Col span={20}>
        <Route path="/:companyId/company/basics" component={Basics} />
        <Route path="/:companyId/company/shares" component={Shares} />
        <Route path="/:companyId/company/shareholders" component={Shareholders} />
        <Route path="/:companyId/company/majorities" component={Majorities} />
      </Col>
    </Row>
  )
}

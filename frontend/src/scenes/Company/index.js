import React, { Component } from 'react'
// antd
import { Menu, Row, Col } from 'antd'
// react-router
import { withRouter, Route } from 'react-router'
import { Link } from 'react-router-dom'
// scenes
import Shareholders from './scenes/Shareholders'
import Basics from './scenes/Basics'

class RawCompanyMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    const companyIndex = pathname.indexOf('/', 1)

    switch(pathname.substr(companyIndex, pathname.length)) {
      case '/company/basics': return ['basics']
      case '/company/shareholders': return ['shareholders']
      default: return ['basics']
    }
  }

  render() {
    const { match: { params: { companyId }}} = this.props

    return(
      <Menu
        selectedKeys={this.getSelectedKey()}
      >
        <Menu.Item key="basics">
          <Link to={`/${companyId}/company/basics`}>Basicos</Link>
        </Menu.Item>
        <Menu.Item key="shareholders">
          <Link to={`/${companyId}/company/shareholders`}>Socios</Link>
        </Menu.Item>
      </Menu>
    )
  }
}
const CompanyMenu = withRouter(RawCompanyMenu)

export default (props) => {
  return (
    <Row type="flex">
      <Col span={4}>
        <CompanyMenu />
      </Col>
      <Col span={20}>
        <Route path="/:companyId/company/basics" component={Basics} />
        <Route path="/:companyId/company/shareholders" component={Shareholders} />
      </Col>
    </Row>
  )
}


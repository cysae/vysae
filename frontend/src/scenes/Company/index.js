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
    switch(pathname) {
      case '/company/basics': return ['basics']
      case '/company/shareholders': return ['shareholders']
      default: return ['basics']
    }
  }

  render() {
    return(
      <Menu
        selectedKeys={this.getSelectedKey()}
      >
        <Menu.Item key="basics">
          <Link to='/company/basics'>Basicos</Link>
        </Menu.Item>
        <Menu.Item key="shareholders">
          <Link to='/company/shareholders'>Socios</Link>
        </Menu.Item>
      </Menu>
    )
  }
}
const CompanyMenu = withRouter(RawCompanyMenu)

export default (props) => (
  <Row type="flex">
    <Col span={4}>
      <CompanyMenu />
    </Col>
    <Col span={20}>
      <Route path="/company/basics" component={Basics} />
      <Route path="/company/shareholders" component={Shareholders} />
    </Col>
  </Row>
)

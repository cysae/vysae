import React, { Component } from 'react'
// antd
import { Menu, Row, Col} from 'antd'
// react-router
import { withRouter, Route } from 'react-router'
import { Link } from 'react-router-dom'
// components
import Next from './scenes/Next'
import Vote from './scenes/Vote'
import Result from './scenes/Result'
import Agreement from './scenes/Agreement'
import Agenda from './scenes/Agenda'

class RawMeetingMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    switch(pathname) {
      case '/meeting/next': return ['nextMeeting']
      default: return ['nextMeeting']
    }
  }

  render() {
    const { match: { params: { companyId}}} = this.props
    return(
      <Menu
        selectedKeys={this.getSelectedKey()}
      >
        <Menu.Item key="nextMeeting">
          <Link to={`/${companyId}/meeting/next`}>Próxima juntas</Link>
        </Menu.Item>
        <Menu.Item key="createActa">
          <Link to={`/${companyId}/meeting/next`}>Crear acta</Link>
        </Menu.Item>
      </Menu>
    )
  }
}
const MeetingMenu = withRouter(RawMeetingMenu)

export default () => (
  <Row type="flex">
    <Col span={4}>
      <MeetingMenu />
    </Col>
    <Col span={20}>
      <Route path="/:companyId/meeting/next" component={Next} />
      <Route path="/:companyId/meeting/:meetingId/vote" component={Vote} />
      <Route path="/:companyId/meeting/:meetingId/result" component={Result} />
      <Route path="/:companyId/meeting/:meetingId/agreement" component={Agreement} />
      <Route path="/:companyId/meeting/:meetingId/orderDay" component={Agenda} />
    </Col>
  </Row>
)

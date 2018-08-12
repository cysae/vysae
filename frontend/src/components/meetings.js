import React, { Component } from 'react'
// antd
import { Menu } from 'antd'
import { Row, Col } from 'antd'
// react-router
import { withRouter, Route } from 'react-router'
import { Link } from 'react-router-dom'
// components
import NextMeetings from '../containers/nextMeetings'
import AnnounceMeeting from '../containers/announceMeeting'
import MeetingHistory from './meetingHistory'
import MeetingDisplayPDF from '../containers/meetingDisplayPDF'
import MeetingVote from '../containers/meetingVote'
import MeetingResult from './meetingResult'
import AnnouncementSent from './announcementSent'

class RawMeetingMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    switch(pathname) {
      case '/meetings/next': return ['nextMeeting']
      case '/meetings/announce': return ['announceMeeting']
      case '/meetings/history': return ['meetingHistory']
      default: return 'nextMeeting'
    }
  }

  render() {
    return(
      <Menu
        selectedKeys={this.getSelectedKey()}
      >
        <Menu.Item key="nextMeeting">
          <Link to='/meetings/next'>Próxima Junta</Link>
        </Menu.Item>
        <Menu.Item key="announceMeeting">
          <Link to='/meetings/announce'>Convocatoria</Link>
        </Menu.Item>
        {/* <Menu.Item key="meetingHistory">
            <Link to='/meetings/history'>Historial de Juntas</Link>
            </Menu.Item> */}
      </Menu>
    )
  }
}
const MeetingMenu = withRouter(RawMeetingMenu)

export default class Meetings extends Component {
  render() {
    return (
      <Row type="flex">
        <Col span={4}>
          <MeetingMenu />
        </Col>
        <Col span={20}>
          <Route path="/meetings/next" component={NextMeetings} />
          {/* <Route path="/meetings/announce" component={() => {
              window.location = 'https://google.com'
              return null
              }} /> */}
          <Route path="/meetings/announce" component={AnnounceMeeting} />
          <Route path="/meetings/sent" component={AnnouncementSent} />
          <Route path="/meetings/history" component={MeetingHistory} />
          <Route path="/meetings/pdf" component={MeetingDisplayPDF} />
          <Route path="/meetings/vote" component={MeetingVote} />
          <Route path="/meetings/result" component={MeetingResult} />
        </Col>
      </Row>
    )
  }
}

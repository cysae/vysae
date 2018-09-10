import React, { Component } from 'react'
// antd
import { Menu, Row, Col, Spin } from 'antd'
// react-router
import { withRouter, Route } from 'react-router'
import { Link } from 'react-router-dom'
// components
import Next from './scenes/Next'
// services
import getCompany from '../../services/getCompany'

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
          <Link to={`/${companyId}/meeting/next`}>Próxima Junta</Link>
        </Menu.Item>
      </Menu>
    )
  }
}
const MeetingMenu = withRouter(RawMeetingMenu)

class Meetings extends Component {
  render() {
    const { company } = this.props
    const { meetings } = company

    return (
      <Row type="flex">
        <Col span={4}>
          <MeetingMenu />
        </Col>
        <Col span={20}>
          <Route
            path="/:companyId/meeting/next"
            render={() => (
              <Next
                meetings={meetings}
                selectMeeting={this.selectMeeting}
              />
            )}
          />
          {/* <Route
              path="/meetings/convene"
              render={() => (
              <MeetingConvene
              company={company}
              />
              )}
              />
              <Route path="/meetings/sent" component={AnnouncementSent} />
              <Route path="/meetings/history" component={MeetingHistory} />
              <Route path="/meetings/pdf" component={MeetingDisplayPDF} />
              <Route path="/meetings/vote/:id" component={MeetingVote} />
              <Route path="/meetings/result/:id" component={MeetingResult} /> */}
        </Col>
      </Row>
    )
  }
}


export default getCompany(Meetings)

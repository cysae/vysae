import React, { Component } from 'react'
import { Row, Col, Menu } from 'antd'
import { Route } from 'react-router'
// components
import { MeetingMenu } from '../containers/menus.js'
import NextMeeting from './nextMeeting.js'
import AnnounceMeeting from './announceMeeting.js'
import MeetingHistory from './meetingHistory.js'
import MeetingPDF from './meetingPDF.js'
import VoteForMeeting from './voteForMeeting.js'
import MeetingResult from './meetingResult.js'
import AnnouncementSent from './announcementSent.js'

export default class Meetings extends Component {
  render() {
    return (
      <Row type="flex">
        <Col span={4}>
          <MeetingMenu />
        </Col>
        <Col span={20}>
          <Route path="/meetings/next" component={NextMeeting} />
          <Route path="/meetings/announce" component={AnnounceMeeting} />
          <Route path="/meetings/sent" component={AnnouncementSent} />
          <Route path="/meetings/history" component={MeetingHistory} />
          <Route path="/meetings/pdf" component={MeetingPDF} />
          <Route path="/meetings/vote" component={VoteForMeeting} />
          <Route path="/meetings/result" component={MeetingResult} />
        </Col>
      </Row>
    )
  }
}

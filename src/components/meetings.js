import React, { Component } from 'react'
import { Row, Col, Menu } from 'antd'
import { Route } from 'react-router'
// components
import { MeetingMenu } from '../containers/menus.js'
import NextMeetings from '../containers/nextMeetings.js'
import AnnounceMeeting from './announceMeeting.js'
import MeetingHistory from './meetingHistory.js'
import MeetingDisplayPDF from '../containers/meetingDisplayPDF.js'
import MeetingVote from '../containers/meetingVote.js'
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
          <Route path="/meetings/next" component={NextMeetings} />
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

import React, { Component } from 'react'
// antd
import { Menu, Row, Col, Spin } from 'antd'
// react-router
import { withRouter, Route } from 'react-router'
import { Link } from 'react-router-dom'
// components
import NextMeetings from '../components/nextMeetings'
import AnnounceMeeting from './announceMeeting'
import MeetingHistory from '../components/meetingHistory'
import MeetingDisplayPDF from './meetingDisplayPDF'
import MeetingVote from './meetingVote'
import MeetingResult from '../components/meetingResult'
import AnnouncementSent from '../components/announcementSent'
// graphql
import { compose, graphql } from 'react-apollo'
import queryCurrentSelections from '../queries/queryCurrentSelections'
import queryCompany from '../queries/queryCompany'

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

class Meetings extends Component {
  render() {
    const { loading, meetings } = this.props
    console.log(meetings)

    if (loading) return <Spin size="large" />

    return (
      <Row type="flex">
        <Col span={4}>
          <MeetingMenu />
        </Col>
        {/* <Col span={20}>
            <Route path="/meetings/next" render={() => <NextMeetings meetings={meetings} />} />
            <Route path="/meetings/announce" component={AnnounceMeeting} />
            <Route path="/meetings/sent" component={AnnouncementSent} />
            <Route path="/meetings/history" component={MeetingHistory} />
            <Route path="/meetings/pdf" component={MeetingDisplayPDF} />
            <Route path="/meetings/vote" component={MeetingVote} />
            <Route path="/meetings/result" component={MeetingResult} />
            </Col> */}
      </Row>
    )
  }
}

const MeetingsWithData = compose(
  graphql(queryCurrentSelections, {
    props: ({ data: { loading, currentSelections: { companyId }} }) => ({
      isLoading: loading,
      currentCompanyId: companyId
    })
  }),
  graphql(queryCompany, {
    options: (props) => ({
      variables: {
        id: props.currentCompanyId,
        withMeetings: true,
      }
    }),
    props: ({ data: { loading, queryCompany } }) => ({
      isCompanyLoading: loading,
      meetings: queryCompany.meetings
    })
  })
)(Meetings)

export default MeetingsWithData

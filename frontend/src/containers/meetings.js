import React, { Component } from 'react'
// antd
import { Menu, Row, Col, Spin } from 'antd'
// react-router
import { withRouter, Route } from 'react-router'
import { Link } from 'react-router-dom'
// components
import MeetingNext from '../components/meetingNext'
import MeetingConvene from './meetingConvene'
import MeetingHistory from '../components/meetingHistory'
import MeetingDisplayPDF from './meetingDisplayPDF'
import MeetingVote from './meetingVote'
import MeetingResult from './meetingResult'
import AnnouncementSent from '../components/announcementSent'
// graphql
import { compose, graphql } from 'react-apollo'
import queryCurrentSelections from '../queries/queryCurrentSelections'
import queryCompany from '../queries/queryCompany'
import mutateCurrentSelections from '../queries/mutateCurrentSelections'

class RawMeetingMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    switch(pathname) {
      case '/meetings/next': return ['nextMeeting']
      case '/meetings/convene': return ['conveneMeeting']
      case '/meetings/announce': return ['announceMeeting']
      case '/meetings/history': return ['meetingHistory']
      default: return ['nextMeeting']
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
        <Menu.Item key="conveneMeeting">
          <Link to='/meetings/convene'>Convocatoria</Link>
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
  constructor(props) {
    super(props)
    this.state = {
      meeting: {}
    }
    this.selectMeeting = this.selectMeeting.bind(this)
  }

  selectMeeting(meeting) {
    this.setState({ meeting })
  }

  render() {
    const { isLoading, isCompanyLoading, company } = this.props

    if ( isLoading || isCompanyLoading || typeof company === 'undefined' ) return <Spin size="large" />
    const { meetings } = company

    return (
    <Row type="flex">
      <Col span={4}>
        <MeetingMenu />
      </Col>
      <Col span={20}>
        <Route
          path="/meetings/next"
          render={() => (
            <MeetingNext
              meetings={meetings}
              selectMeeting={this.selectMeeting}
            />
          )}
        />
        <Route
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
        <Route
          path="/meetings/vote"
          render={() => (
            <MeetingVote meeting={this.state.meeting} />
          )}
        />
        <Route path="/meetings/result" component={MeetingResult} />
      </Col>
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
        withAgreements: true,
      }
    }),
    props: ({ data: { loading, queryCompany }}) => ({
      isCompanyLoading: loading,
      company: queryCompany,
    })
  })
)(Meetings)

export default MeetingsWithData

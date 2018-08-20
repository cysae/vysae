import React, { Component, Fragment } from 'react'
import { Row, Col, Button } from 'antd'
import MeetingPDF from './meetingPDF.js'

export default class MeetingConfirmation extends Component {
  render() {
    console.log(this.props)
    return (
      <Fragment>
        <Row type="flex">
          <Col span={24}>
            <MeetingPDF meeting={this.props.meeting} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button onClick={this.props.prev}>Atrás</Button>
            <Button onClick={this.props.next}>Convocar</Button>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

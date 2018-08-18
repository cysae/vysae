import React, { Component, Fragment } from 'react'
// antd
import { Form, Steps, Spin } from 'antd'
// components
import MeetingStatus from './meetingStatus'
import MeetingConfirmation from '../components/meetingConfirmation'
import MeetingForm from '../components/meetingForm'
// style
import styled from 'styled-components'
// graphql
import { graphql, compose } from 'react-apollo'
import queryMeetingDocx from '../queries/queryMeetingDocx'
const Step = Steps.Step

const Iframe = styled.iframe`
  width: 100%;
`

class AnnounceMeeting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      meeting: {}
    }

    this.saveMeeting = this.saveMeeting.bind(this)
    this.saveMeetingState = this.saveMeetingState.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  saveMeetingState() {
    const { getFieldValue } = this.props.form
    if( getFieldValue('votingPeriod') ) {
      this.setState({
        meeting: {
          companyName: 'CYSAE',
          /* dni: this.props.user.dni, */
          location: 'Barcelona',
          meetingType: getFieldValue('meetingType'),
          votingStart: getFieldValue('votingPeriod')[0],
          votingEnd: getFieldValue('votingPeriod')[1],
          agreementTypes: getFieldValue('agreementTypes'),
          additionalInfo: getFieldValue('additionalInfo')
        }
      })
    }
  }

  saveMeeting() {
    const { meeting } = this.state
  }

  render() {
    const { isLoading, form } = this.props
    const { current, meeting } = this.state

    if ( isLoading ) return <Spin size="large"></Spin>

    const steps = [{
      title: 'Convocatoria Formulario',
      content: <MeetingForm saveMeetingState={this.saveMeetingState} form={form} next={this.next} prev={this.prev} />
    }, {
      title: 'Comprobar Convocatoria',
        content: (
          <MeetingConfirmation
            meeting={meeting}
            saveMeeting={this.saveMeeting}
            next={this.next}
            prev={this.prev}
          />
        ),
    }, {
      title: 'Estado',
      content: (<MeetingStatus meeting={meeting} prev={this.prev} next={this.next} />),
    }];

    return (
      <Fragment>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
      </Fragment>
    )
  }
}

export default  Form.create()(AnnounceMeeting)

import React, { Component, Fragment } from 'react'
// antd
import { Form, Steps, Spin } from 'antd'
// components
import MeetingStatus from './meetingStatus'
import MeetingConfirmation from '../components/meetingConfirmation'
import MeetingForm from '../components/meetingForm'
// graphql
const Step = Steps.Step

class MeetingConvene extends Component {
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
    const { form, company } = this.props
    const { getFieldValue } = form
    if( getFieldValue('votingPeriod') ) {
      this.setState({
        meeting: {
          companyName: 'CYSAE',
          company,
          /* dni: this.props.user.dni, */
          location: 'Barcelona',
          meetingType: getFieldValue('meetingType'),
          start: getFieldValue('votingPeriod')[0],
          end: getFieldValue('votingPeriod')[1],
          agreements: getFieldValue('agreementTypes').map(
            agreementName => ({
              name: agreementName
            })
          ),
          additionalInfo: getFieldValue('additionalInfo')
        }
      })
    }
  }

  saveMeeting() {}

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
        content: (
          <MeetingStatus
            meeting={meeting}
            prev={this.prev}
            next={this.next}
          />
        ),
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

export default  Form.create()(MeetingConvene)

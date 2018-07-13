import React, { Component, Fragment } from 'react'
import { Form, Divider, Steps } from 'antd'
// Redux
import { connect } from 'react-redux'
import {
  updateMeetingForm,
} from '../actions/index'
// components
import MeetingForm from './meetingForm.js'
import MeetingStatus from './meetingStatus.js'
import MeetingConfirmation from '../components/meetingConfirmation.js'
const Step = Steps.Step

function HOCForm(formComponent) {
  return connect((state) => ({
    formState: {...state.meetingForm},
    user: state.signedInUser
  }))(Form.create({
    onFieldsChange(props, changedFields) {
      props.dispatch(updateMeetingForm(changedFields))
    },
    mapPropsToFields(props) {
      const fields = {};
      for (const key in props.formState) {
        fields[key] = Form.createFormField(props.formState[key])
      }
      return fields;
    },
    onValuesChange(_, values) {
      /* console.log(values); */
    },
  })(formComponent))
}

class AnnounceMeeting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      meeting: {}
    }

    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.saveMeeting = this.saveMeeting.bind(this)
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  saveMeeting() {
    const { getFieldValue } = this.props.form
    if( getFieldValue('votingPeriod') ) {
      this.setState({
        meeting: {
          companyName: 'CYSAE',
          dni: this.props.user.dni,
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

  render() {
    const { current, meeting } = this.state
    const { form } = this.props


    const steps = [{
      title: 'Convocatoria Formulario',
      content: <MeetingForm form={form} saveMeeting={this.saveMeeting} next={this.next} prev={this.prev} />,
    }, {
      title: 'Comprobar Convocatoria',
      content: <MeetingConfirmation meeting={meeting} next={this.next} prev={this.prev}/>,
    }, {
      title: 'Estado',
      content: <MeetingStatus meeting={meeting} prev={this.prev}/>,
    }];

    return (
      <Fragment>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <Divider />
        <div className="steps-content">{steps[current].content}</div>
        <pre>
          {JSON.stringify(this.props.formState, null, 2)}
        </pre>
      </Fragment>
    )
  }
}



export default HOCForm(AnnounceMeeting)
import React, { Component, Fragment } from 'react'
import { Form, Divider, Steps } from 'antd'
// Redux
import { connect } from 'react-redux'
import {
  updateMeetingForm
} from '../actions/index'
// components
import MeetingForm from '../containers/meetingForm.js'
import MeetingPDF from './meetingPDF.js'
const Step = Steps.Step

function HOCForm(formComponent) {
  return connect((state) => {
    return {
      formState: {
        ...state.meetingForm
      }
    }
  })(Form.create({
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
      current: 0
    }

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

  getMeetingData() {
    const { getFieldValue } = this.props.form
    if( getFieldValue('votingPeriod') ) {
      return {
        companyName: 'CYSAE',
        person: 'Javier Pascual',
        location: 'Barcelona',
        meetingType: getFieldValue('meetingType'),
        votingStart: getFieldValue('votingPeriod')[0],
        votingEnd: getFieldValue('votingPeriod')[1],
        agreementTypes: getFieldValue('agreementTypes'),
        additionalInfo: getFieldValue('additionalInfo')
      }
    }
    return {}
  }

  render() {
    const { current } = this.state
    const { form } = this.props

    const steps = [{
      title: 'Convocatoria Formulario',
      content: <MeetingForm form={form} next={this.next} prev={this.prev} />,
    }, {
      title: 'Comprobar Convocatoria',
      content: <MeetingPDF meeting={this.getMeetingData()} next={this.next} prev={this.prev}/>,
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

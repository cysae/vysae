import React, { Component, Fragment } from 'react'
import { Form, Divider, Steps } from 'antd'
// Redux
import { updateAnnouncement } from '../actions/index.js'
import { connect } from 'react-redux'
import { saveCompanyForm } from '../actions/index'
// components
import MeetingForm from '../containers/meetingForm.js'
const Step = Steps.Step

function HOCForm(formComponent) {
  return connect((state) => {
    return {
      formState: {
        ...state.companyForm
      }
    }
  })(Form.create({
    onFieldsChange(props, changedFields) {
      props.dispatch(saveCompanyForm(changedFields))
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      /* if (!err) { */
      this.props.updateAnnouncement(this.getMeetingData())
      this.props.history.push('/meetings/pdf')
    });
  }

  getMeetingData() {
    const { getFieldValue } = this.props.form
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

  render() {
    const { current } = this.state
    const { form } = this.props

    const steps = [{
      title: 'Form',
      content: <MeetingForm form={form} next={this.next} prev={this.prev} />,
    }, {
      title: 'Participaciones',
      content: <div>2</div>,
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


const mapStateToProps = state => {
  return state.announcement
}
const mapDispatchToProps = dispatch => {
  return {
    updateAnnouncement: announcement => { dispatch(updateAnnouncement(announcement)) }
  }
}

export default HOCForm(connect(mapStateToProps, mapDispatchToProps)(AnnounceMeeting))

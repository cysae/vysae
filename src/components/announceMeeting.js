import React, {Component} from 'react'
import { Form, Radio, Button, DatePicker, TimePicker, Row, Col, Input, Upload, Icon, message } from 'antd'
// Redux
import { updateAnnouncement } from '../actions/index.js'
import { connect } from 'react-redux'
import { HOCForm } from '../containers/addCompanyForms.js'
import AgreementSelector from './agreementSelector.js'
import { withRouter } from 'react-router-dom'
// components
import MeetingPDF from './meetingPDF.js'
const FormItem = Form.Item
const { TextArea } = Input
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { RangePicker } = DatePicker;

class AnnounceMeeting extends Component {
  handleSubmit = (e) => {
    const { getFieldValue } = this.props.form
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
    const { form } = this.props
    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        span: 18,
        offset: 6
      }
    }

    const uploadProps = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} >
        <FormItem label="Tipo" {...formItemLayout} >
          {getFieldDecorator('meetingType', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(
             <RadioGroup>
               <RadioButton value="ordinaryMeeting">Junta General Ordiniaria</RadioButton>
               <RadioButton value="extraordinaryMeeting">Junta General Extraordinaria</RadioButton>
             </RadioGroup>
           )}
        </FormItem>
        <FormItem
          label="Duracion:"
          {...formItemLayout}
        >
          {getFieldDecorator('votingPeriod', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(
             <RangePicker
               showTime={{ format: "HH:mm" }}
               format="DD-MM-YYYY HH:mm"
               placeholder={['Inicio', 'Final']}
             />
           )}
        </FormItem>
        <AgreementSelector
          form={form}
          label="Selecciona tipos de acuerdos"
          formItemLayout={formItemLayout}
          fieldId="agreementTypes"
        />

        <FormItem
          label="Informacion Addicional"
          {...formItemLayout}
        >
          {getFieldDecorator('additionalInfo', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(<TextArea autosize={{ minRows: 4}}  />)}
        </FormItem>

        {/* <Upload {...uploadProps}>
            <Button>
            <Icon type="upload" /> Click to Upload
            </Button>
            </Upload> */}

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            Enviar Convocatoria
          </Button>
        </FormItem>
        <pre>
          {JSON.stringify(this.props.formState, null, 2)}
        </pre>
      </Form>
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

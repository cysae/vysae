import React, {Component} from 'react'
import { Form, Radio, Button, DatePicker, TimePicker, Row, Col, Input, Upload, Icon, message } from 'antd'
import { HOCForm } from '../containers/addCompanyForms.js'
import AgreementSelector from './agreementSelector.js'
const FormItem = Form.Item
const { TextArea } = Input
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class AnnounceMeeting extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      /* if (!err) { */
    });
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

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
      <Form onSubmit={this.handleSubmit} layout='inline' >
        <FormItem>
          {getFieldDecorator('meetingType', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(
             <RadioGroup>
               <RadioButton value="normalMeeting">Junta General Ordiniaria</RadioButton>
               <RadioButton value="extraordinaryMeeting">Junta General Extraordinaria</RadioButton>
             </RadioGroup>
           )}
        </FormItem>
        <Row type="flex">
          <Col>
            <FormItem label="Fecha Inicio:">
              {getFieldDecorator('startDate', {
                 rules: [{ required: true, message: 'Es obligatorio.' }],
              })(<DatePicker />)}
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              {getFieldDecorator('startTime', {
                 rules: [{ required: true, message: 'Es obligatorio.' }],
              })(<TimePicker />)}
            </FormItem>
          </Col>
        </Row>

        <Row type="flex">
          <Col>
            <FormItem label="Fecha Final:">
              {getFieldDecorator('endDate', {
                 rules: [{ required: true, message: 'Es obligatorio.' }],
              })(<DatePicker />)}
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              {getFieldDecorator('endTime', {
                 rules: [{ required: true, message: 'Es obligatorio.' }],
              })(<TimePicker />)}
            </FormItem>
          </Col>
        </Row>

        <Row type="flex">
          <Col>
            <AgreementSelector
              form={form}
              fieldId="agreementTypes"
            />
          </Col>
        </Row>

        <Row type="flex">
          <Col>
            <FormItem label="Informacion Addicional">
              {getFieldDecorator('additionalInfo', {
                 rules: [{ required: true, message: 'Es obligatorio.' }],
              })(<TextArea autosize />)}
            </FormItem>
          </Col>
        </Row>

        <Upload {...uploadProps}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>

        <Button type="primary" htmlType="submit">
          Enviar Convocatoria
        </Button>

        <pre>
          {JSON.stringify(this.props.formState, null, 2)}
        </pre>
      </Form>
    )
  }
}

export default HOCForm(AnnounceMeeting)

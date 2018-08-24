import React, { Component } from 'react'
import { Form, Button, DatePicker } from 'antd'
import AgreementSelector from '../components/agreementSelector.js'
const FormItem = Form.Item
/* const { TextArea } = Input
 * const RadioButton = Radio.Button
 * const RadioGroup = Radio.Group */
const { RangePicker } = DatePicker;

class MeetingForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      /* if (!err) { */
      this.props.saveMeetingState()
      this.props.next()
    });
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

    return(
      <Form onSubmit={this.handleSubmit} >
        {/* <FormItem label="Tipo" {...formItemLayout} >
            {getFieldDecorator('meetingType', {
            rules: [{ required: true, message: 'Es obligatorio.' }],
            })(
            <RadioGroup>
            <RadioButton value="ordinaryMeeting">Junta General Ordiniaria</RadioButton>
            <RadioButton value="extraordinaryMeeting">Junta General Extraordinaria</RadioButton>
            </RadioGroup>
            )}
            </FormItem> */}
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

        {/* <FormItem
            label="Informacion Addicional"
            {...formItemLayout}
            >
            {getFieldDecorator('additionalInfo', {
            rules: [{ required: true, message: 'Es obligatorio.' }],
            })(<TextArea autosize={{ minRows: 4}}  />)}
            </FormItem> */}

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

export default MeetingForm

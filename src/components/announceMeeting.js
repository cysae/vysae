import React, {Component} from 'react'
import { Form, Radio, Button } from 'antd'
import { HOCForm } from '../containers/addCompanyForms.js'
import AgreementSelector from './agreementSelector.js'
const FormItem = Form.Item
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

    return (
      <Form onSubmit={this.handleSubmit}>
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

        <AgreementSelector
          form={form}
          fieldId="agreementTypes" />

        <Button type="primary" htmlType="submit">
          Convocar
        </Button>

        <pre>
          {JSON.stringify(this.props.formState, null, 2)}
        </pre>
      </Form>
    )
  }
}

export default HOCForm(AnnounceMeeting)

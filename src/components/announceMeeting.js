import React, {Component} from 'react'
import { Form, Radio, Button, DatePicker, Input } from 'antd'
// Redux
import { updateAnnouncement } from '../actions/index.js'
import { connect } from 'react-redux'
import { saveCompanyForm } from '../actions/index'
// components
import AgreementSelector from './agreementSelector.js'
const FormItem = Form.Item
const { TextArea } = Input
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { RangePicker } = DatePicker;

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

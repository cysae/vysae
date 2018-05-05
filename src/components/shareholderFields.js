import React, { Component, Fragment } from 'react'
import { Form, DatePicker, Input, Button, Icon, Radio, Divider } from 'antd'
import ShareIntervalFields from './shareIntervalFields'
import { HOCForm, formItemLayout } from '../containers/addCompanyForms'
const { TextArea } = Input;
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class RawShareHolderFields extends Component {
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <Fragment>
        <h3>Operations</h3>
        <FormItem
          label="Fecha de la operación"
          {...formItemLayout}
        >
          {getFieldDecorator('operationDate', {
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <DatePicker placeholder="Seleccionar fecha" />
           )}
        </FormItem>
        <FormItem
          label="Tipo de operación:"
          {...formItemLayout}
        >
          {getFieldDecorator('operationType', {
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <RadioGroup>
               <RadioButton value="aquisition">adquisición</RadioButton>
               <RadioButton value="">enajenación</RadioButton>
             </RadioGroup>
           )}
        </FormItem>
        <FormItem
          label="Concepto:"
          {...formItemLayout}
        >
          {getFieldDecorator('operationConcept', {
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <TextArea placholder="Concepto" autosize/>
           )}
        </FormItem>
        <ShareIntervalFields />
      </Fragment>
    )
  }
}

export default HOCForm(RawShareHolderFields)

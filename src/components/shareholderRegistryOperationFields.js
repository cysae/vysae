import React, { Component, Fragment } from 'react'
import { Form, DatePicker, Input, Radio, Row, Col } from 'antd'
import ShareIntervalFields from './shareIntervalFields'
import PropTypes from 'prop-types'
import { formItemLayout } from '../containers/addCompanyForms'
const { TextArea } = Input;
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class ShareholderRegistryOperationFields extends Component {
  render() {
    const { form } = this.props
    const { getFieldDecorator } = form;

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
        <Row type="flex">
          <Col span={17} offset={10}>
            <ShareIntervalFields form={form} />
          </Col>
        </Row>
      </Fragment>
    )
  }
}

ShareholderRegistryOperationFields.propTypes = {
  form: PropTypes.object.isRequired
}

export default ShareholderRegistryOperationFields

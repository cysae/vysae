import React, { Component, Fragment } from 'react'
import { Form, Radio, Divider, Row, Col } from 'antd'
import ShareIntervalFields from './shareIntervalFields'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class ShareSuffrageFields extends Component {
  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form;

    return (
      <Fragment>
        <FormItem
          label="¿Hay participaciones sin voto?"
          labelCol={{span: 12}}
        >
          {getFieldDecorator('hasSharesWithoutSuffrage', {
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <RadioGroup>
               <RadioButton value="yes">Sí</RadioButton>
               <RadioButton value="no">No</RadioButton>
             </RadioGroup>
           )}
        </FormItem>
        {(getFieldValue('hasSharesWithoutSuffrage') === 'yes') && (
           <Row>
             <Col offset={12}>
               <ShareIntervalFields form={form} fieldId="shareIntervalWithoutSuffrage" />
             </Col>
           </Row>
        )}
        <Divider dashed />

        <FormItem
          label="¿Hay participaciones con derecho de voto differente?"
          labelCol={{span: 12}}
        >
          {getFieldDecorator('hasSharesWithUnequalSuffrage', {
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <RadioGroup>
               <RadioButton value="yes">Sí</RadioButton>
               <RadioButton value="no">No</RadioButton>
             </RadioGroup>
           )}
        </FormItem>
        {(getFieldValue('hasSharesWithUnequalSuffrage') === 'yes') && (
           <Row>
             <Col offset={12}>
               <ShareIntervalFields form={form} fieldId="shareIntervalWithUnequalSuffrage" />
             </Col>
           </Row>
        )}
      </Fragment>
    )
  }
}

export default ShareSuffrageFields

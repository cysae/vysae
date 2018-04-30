import React, { Component, Fragment } from 'react'
import { Form, InputNumber, Button, Icon, Radio, Divider } from 'antd'
import ShareIntervalFields from './shareIntervalFields'
import { HOCForm, formItemLayout } from '../containers/addCompanyForms'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class RawShareSuffrageFields extends Component {
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <Fragment>
        <FormItem
          label="¿Hay participaciones sin voto?"
          {...formItemLayout}
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
        {(getFieldValue('hasSharesWithoutSuffrage') === 'yes') && <ShareIntervalFields fieldId="shareIntervalWithoutSuffrage" />}
        <Divider dashed />

        <FormItem
          label="¿Hay participaciones con derecho de voto differente?"
          {...formItemLayout}
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
        {(getFieldValue('hasSharesWithUnequalSuffrage') === 'yes') && <ShareIntervalFields fieldId="shareIntervalWithUnequalSuffrage" />}
      </Fragment>
    )
  }
}

export default HOCForm(RawShareSuffrageFields)

import React, { Component, Fragment } from 'react'
import { Form, Input } from 'antd'
import { connect } from 'react-redux'

const FormItem = Form.Item


const BasicForm = connect((state) => {
  return {
    formState: {
      name: state.companyForm.name,
      registeredOffice: state.companyForm.registeredOffice,
      socialCapital: state.companyForm.socialCapital,
    }
  }
})(Form.create({
  onFieldsChange(props, changedFields) {
    props.dispatch({
      type: 'save_fields',
      payload: changedFields,
    })
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField(props.formState.name),
      registeredOffice: Form.createFormField(props.formState.registeredOffice),
      socialCapital: Form.createFormField(props.formState.socialCapital),
    }
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Fragment>
    <Form>
      <FormItem label="Denominación social">
        {getFieldDecorator('name', {
           rules: [{ required: true, message: 'Es obligatorio.' }],
        })(<Input />)}
      </FormItem>
      <FormItem label="Domicilio Social">
        {getFieldDecorator('registeredOffice', {
           rules: [{ required: true, message: 'Es obligatorio.' }],
        })(<Input />)}
      </FormItem>
      <FormItem label="Capital social">
        {getFieldDecorator('socialCapital', {
           rules: [{ required: true, message: 'Es obligatorio.' }],
        })(<Input />)}
      </FormItem>
    </Form>
    <pre>
      {JSON.stringify(props.formState, null, 2)}
    </pre>
    </Fragment>
  );
}))

export default BasicForm

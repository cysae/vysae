import React, { Component, Fragment } from 'react'
import { Form, Input, Button } from 'antd'
import { connect } from 'react-redux'

const FormItem = Form.Item

class BasicForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('submit');
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
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
          <FormItem>
            <Button type="primary" htmlType="submit">
              Continuar
            </Button>
          </FormItem>
        </Form>
        <pre>
          {JSON.stringify(this.props.formState, null, 2)}
        </pre>
      </Fragment>
    );
  }
}

const ReduxBasicForm = connect((state) => {
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
})(BasicForm))


export default ReduxBasicForm

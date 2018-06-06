import React, { Component } from 'react'
import { Form, Input, Button} from 'antd'
import Amplify, { API } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
import { v4 as uuid } from 'uuid'
// components
Amplify.configure(aws_exports)
const FormItem = Form.Item

export default class BasicForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.createCompany()
        this.props.next()
      }
    });
  }

  componentDidMount() {
    console.log('mounted')
    const { setFieldsValue } = this.props.form
    setFieldsValue({ companyId: uuid() })
  }

  async createCompany() {
    const { getFieldValue } = this.props.form
    const companyId = uuid()
    const name = getFieldValue('name')
    const placeOfBusiness = getFieldValue('placeOfBusiness')
    const nif = getFieldValue('nif')

    const body = {
      uuid: companyId,
      name,
      placeOfBusiness,
      nif,
    }
    await API.put('companyCRUD', '/company', { body })
  }

  render() {
    const { getFieldDecorator } = this.props.form;


    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem
          style={{display: 'none'}}
        >
          {getFieldDecorator('companyId', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(<Input />)}
        </FormItem>

        <FormItem
          label="Denominación social"
        >
          {getFieldDecorator('name', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="Domicilio Social"
        >
          {getFieldDecorator('placeOfBusiness', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="NIF"
        >
          {getFieldDecorator('nif', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(<Input />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Continuar
          </Button>
        </FormItem>
      </Form>
    );
  }
}

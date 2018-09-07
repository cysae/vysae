import React, { Component } from 'react'
// antd
import { Form, Button, Input } from 'antd'
// services
import getCompany from '../../services/getCompany'
// graphql
import { compose } from 'react-apollo'

const FormItem = Form.Item

class Basics extends Component {
  componentDidMount() {
    const {
      form: { setFieldsValue },
      company: { name }
    } = this.props

    setFieldsValue({
      name
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
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
            Guardar
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default compose(
  Form.create(),
  getCompany,
)(Basics)

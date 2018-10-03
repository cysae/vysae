import React, { Component } from 'react'
// antd
import { Form, Button, Input, message } from 'antd'
// services
import getCompany from '../../../../services/getCompany'
import { compose } from 'recompose'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { UpdateCompany } from '../../../../graphql/mutations'

const FormItem = Form.Item

class Basics extends Component {
  componentDidMount() {
    const {
      form: { setFieldsValue },
      company: { name, placeOfBusiness, nif }
    } = this.props

    setFieldsValue({
      name,
      placeOfBusiness,
      nif
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form : { validateFields },
      match: { params: { companyId }},
    } = this.props

    validateFields((err, values) => {
      if (!err) {
        const hideLoadingMsg = message.loading('Actualizando socidedad...', 0)
        API.graphql(graphqlOperation(gqlToString(UpdateCompany), { input: { id: companyId, ...values }}))
          .then(() => {
            message.success('Sociedad actualizada', 2.5)
            hideLoadingMsg()
          })
          .catch(err => {
            console.error(err)
            hideLoadingMsg()
            message.error('error')
          })
      }
    })
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
          label="Domicilio social"
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

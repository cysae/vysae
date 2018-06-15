import React, { Component } from 'react'
import { Form, Input, Button} from 'antd'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import {
  requestCompanyUpdate,
  requestUsersToCompanyAdmin,
} from '../actions/index.js'
// components
const FormItem = Form.Item

class BasicForm extends Component {
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
    const { setFieldsValue } = this.props.form
    setFieldsValue({ companyId: uuid() })
  }

  createCompany() {
    const { form, signedInUser } = this.props
    const { getFieldValue } = form
    const companyId = getFieldValue('companyId')
    const name = getFieldValue('name')
    const placeOfBusiness = getFieldValue('placeOfBusiness')
    const nif = getFieldValue('nif')

    const body = {
      uuid: companyId,
      name,
      placeOfBusiness,
      nif,
    }

    this.props.requestCompanyUpdate( companyId, body)
    this.props.requestUsersToCompanyAdmin([signedInUser], companyId)
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

const mapStateToProps = state => {
  return {
    signedInUser: state.signedInUser
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestCompanyUpdate: (companyId, body) => { dispatch(requestCompanyUpdate(companyId, body)) },
    requestUsersToCompanyAdmin: (users, companyId) => { dispatch(requestUsersToCompanyAdmin(users, companyId)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicForm)

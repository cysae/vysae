import React, { Component } from 'react'
import { Form, Input, Button} from 'antd'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { requestCompanyUpdate } from '../actions/index.js'
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

    this.props.requestCompanyUpdate( companyId, body)


    this.props.requestUsersToCompanyAdmin(shareholders, companyId)
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

const mapStateToProps = state => {}
const mapDispatchToProps = dispatch => {
  return {
    requestCompanyUpdate: (companyId, body) => { dispatch(requestCompanyUpdate(companyId, body)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicForm)

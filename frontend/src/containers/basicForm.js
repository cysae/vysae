import React, { Component } from 'react'
import { Form, Input, Button} from 'antd'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
// graphql
import { graphql } from 'react-apollo'
import MutationCreateCompany from '../queries/MutationCreateCompany'
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
    const { form, createCompany } = this.props
    const { getFieldValue } = form
    const name = getFieldValue('name')
    /* const placeOfBusiness = getFieldValue('placeOfBusiness')
     * const nif = getFieldValue('nif') */

    /* const body = {
     *   uuid: companyId,
     *   name,
     *   placeOfBusiness,
     *   nif,
     * } */

    createCompany(name)
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

export default graphql(
  MutationCreateCompany,
  {
    options: props => ({
      update: (proxy, { data }) => {
        console.log(data)
      }
    }),
    props: (props) => ({
      createCompany: (name) => props.mutate({
        variables: {
          name
        }
      })
    })
  }
)(connect(mapStateToProps)(BasicForm))

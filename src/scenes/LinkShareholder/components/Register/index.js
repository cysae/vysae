import React, { Component } from 'react'
import { Form, Input, Select, Button, message } from 'antd';
// amplify
import { Auth } from 'aws-amplify'

const FormItem = Form.Item;
const Option = Select.Option;

class Register extends Component {
  state = {
    confirmDirty: false,
    loading: false
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return

      const {
        next,
      } = this.props

      const user = {
        ...values
      }

      this.setState({ loading: true })
      Auth.signOut()
      .then(() => {
        return Auth.signUp({
          username: user.username,
          password: user.password,
          attributes: {
            email: user.email,          // optional
            phone_number: user.prefix+user.phone,   // optional - E.164 number convention
          },
          validationData: []  //optional
        })
      }).then(() => {
        message.success('Estas registrado')
        next(user)
      }).catch(err => {
        console.error(err)
        switch(err.code) {
          case "InvalidParameterException": message.error("Password must have length greater than 6"); break
          case "InvalidPasswordException": message.error("Password needs to contain upper case and symbols"); break
          case "UsernameExistsException": message.error("El nombre de usario ya es cogido"); break
          default: message.error("Check your input again")
        }
        this.setState({ loading: false})
      })
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords differ!');
    } else {
      callback();
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { loading } = this.state

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+34',
    })(
      <Select style={{ width: 70 }}>
        <Option value="+34">+34</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="Username">
          {getFieldDecorator('username', {
             rules: [{
               required: true, message: 'Please input a username!',
             }],
          })(
             <Input />
           )}
        </FormItem>
        <FormItem label="E-mail">
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem label="Confirm Password">
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" loading={loading}>Register</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Register)

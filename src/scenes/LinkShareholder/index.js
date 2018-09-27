import React, { Component } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, message } from 'antd';
// amplify
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import {
  CreateUser,
  CreateCompanyUser,
  UpdateShareholder,
  DeleteUser
} from '../../graphql/mutations'

const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

const linkShareholder = async (user, companyId, shareholderId) => {
  let userId

  return API.graphql(graphqlOperation(gqlToString(CreateUser), {
    input: { name: user.username }
  })).then(({ data: { createUser }}) => {
    userId = createUser.id

    return Promise.all([
      Auth.signUp({
        username: user.username,
        password: user.password,
        attributes: {
          email: user.email,          // optional
          phone_number: user.prefix+user.phone,   // optional - E.164 number convention
          ['custom:userId']: createUser.id,
        },
        validationData: []  //optional
      }),
      API.graphql(graphqlOperation(gqlToString(UpdateShareholder), {
        input: {
          id: shareholderId,
          shareholderUserId: createUser.id,
        }
      })),
      API.graphql(graphqlOperation(gqlToString(CreateCompanyUser), {
        input: {
          companyUserCompanyId: companyId,
          companyUserUserId: createUser.id,
        }
      }))
    ])
  }).catch(err => {
    return API.graphql(graphqlOperation(gqlToString(DeleteUser), {
      input: { id: userId }
    })).then(() => {
      throw err
    })
  })
}

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return

      const { match: { params: { shareholderId, companyId }}} = this.props

      const user = {
        ...values
      }

      linkShareholder(user, companyId, shareholderId).then(() => {
        message.success('Estas registrado')
      }).catch(err => {
        console.error(err)
        switch(err.code) {
          case "InvalidParameterException": message.error("Password must have length greater than 6"); break
          case "InvalidPasswordException": message.error("Password needs to contain upper case and symbols"); break
          case "UsernameExistsException": message.error("El nombre de usario ya es cogido"); break
          default: message.error("Check your input again")
        }
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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+34',
    })(
      <Select style={{ width: 70 }}>
        <Option value="+34">+34</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Username"
        >
          {getFieldDecorator('username', {
             rules: [{
               required: true, message: 'Please input a username!',
             }],
          })(
             <Input />
           )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
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
          {...formItemLayout}
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
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
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
        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegistrationForm)

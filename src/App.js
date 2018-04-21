import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Input, Button } from 'antd';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports.js';
import Dashboard from './dashboard.js';
Amplify.configure(aws_exports);
const FormItem = Form.Item;

class App extends Component {
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      }
    }

    return (
      <div className="App">
        <Dashboard />
        <Form>
          <FormItem
            {...formItemLayout}
            label="Denominación social"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Denominación social"
          >
            <Input />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default withAuthenticator(App);

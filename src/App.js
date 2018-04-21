import React, { Component } from 'react'
import { Form, Input, Row, Col } from 'antd'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import aws_exports from './aws-exports.js'
import Dashboard from './dashboard.js'
import RegistrationSteps from './components/registrationSteps.js'
Amplify.configure(aws_exports)
const FormItem = Form.Item

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
      <Row className="App">
        <Col span={24}>
          <RegistrationSteps />
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
        </Col>
      </Row>
    );
  }
}

export default withAuthenticator(App)

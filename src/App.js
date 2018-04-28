import React, { Component } from 'react'
import { Form, Input, Row, Col } from 'antd'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import aws_exports from './aws-exports.js'
Amplify.configure(aws_exports)
const FormItem = Form.Item

class App extends Component {
  render() {

    return (
      <Row className="App">
        <Col span={24}>
        </Col>
      </Row>
    );
  }
}

export default withAuthenticator(App)

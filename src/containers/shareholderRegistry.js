import React, { Component, Fragment } from 'react'
// Antd
import { Form, Button, Divider} from 'antd'
// Amplify
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
// components
import Shareholders from '../components/shareholder'
Amplify.configure(aws_exports)
const FormItem = Form.Item

export default class ShareholderRegistry extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      /* this.update() */
      if (!err) {
        this.props.next()
      }
    });
  }

  async update() {
    const user = {
      username: 'test',
      password: '%Test1991',
      attributes: {
        email: 'test@test.de',
        phone_number: '+14155552671',
        [`custom:firstName`]: 'Dirk',
        [`custom:lastName`]: 'Hornung',
      }
    }
    await Auth.signUp(user)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }


  render() {
    const { form } = this.props
    const { getFieldValue } = form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Shareholders form={form} personType={getFieldValue('personType')} />
          <Divider />
          <FormItem>
            <Button type="primary" onClick={this.props.prev}>
              Atrás
            </Button>
            <Button type="primary" htmlType="submit">
              Continuar
            </Button>
          </FormItem>
        </Form>
        <pre>
          {JSON.stringify(this.props.formState, null, 2)}
        </pre>
      </Fragment>
    );
  }
}

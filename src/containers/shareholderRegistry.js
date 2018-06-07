import React, { Component, Fragment } from 'react'
// Antd
import { Form, Button, Divider} from 'antd'
// Redux
import { requestUsersSignUp } from '../actions/index.js'
import { connect } from 'react-redux'
// utils
import { generatePassword } from '../utils/index.js'
// components
import Shareholders from '../components/shareholder'
const FormItem = Form.Item


class ShareholderRegistry extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.registerUsers()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.next()
      }
    });
  }

  registerUsers() {
    const { getFieldValue } = this.props.form
    const user2 = {
      username: 'test2',
      password: '%Test1991',
      attributes: {
        email: 'test@test.de',
        phone_number: '+14155552671',
        [`custom:firstName`]: 'Dirk',
        [`custom:lastName`]: 'Hornung',
      }
    }

    const shareholderIds = getFieldValue('shareholders')
    const users = shareholderIds.map((id) => {
      return {
        username: getFieldValue(`dni_${id}`),
        password: generatePassword(),
        attributes: {
          email: getFieldValue(`email_${id}`),
          phone_number: getFieldValue(`telefon_${id}`),
          [`custom:firstName`]: getFieldValue(`firstName_${id}`),
          [`custom:lastName`]: getFieldValue(`lastName_${id}`),
          [`custom:permanentAddress`]: getFieldValue(`permanentAddress_${id}`),
          [`custom:nationality`]: getFieldValue(`nationality_${id}`),
        }
      }
    })

    this.props.requestUsersSignUp(users)
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


const mapStateToProps = state => {}
const mapDispatchToProps = dispatch => {
  return {
    requestUsersSignUp: (users) => { dispatch(requestUsersSignUp(users)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareholderRegistry)

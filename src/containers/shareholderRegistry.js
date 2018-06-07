import React, { Component, Fragment } from 'react'
// Antd
import { Form, Button, Divider} from 'antd'
// Redux
import { requestUsersSignUp } from '../actions/index.js'
import { connect } from 'react-redux'
// components
import Shareholders from '../components/shareholder'
const FormItem = Form.Item

class ShareholderRegistry extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.requestUsersSignUp()
    this.props.form.validateFields((err, values) => {
      /* this.update() */
      if (!err) {
        this.props.next()
      }
    });
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

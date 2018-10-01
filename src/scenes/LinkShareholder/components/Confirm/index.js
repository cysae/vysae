import React from 'react'
// antd
import { Form, Input, Button, message } from 'antd'
// amplify
import { Auth } from 'aws-amplify'
const FormItem = Form.Item

class Confirm extends React.Component {
  componentDidMount() {
    this.sendCode()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      username,
      form: { validateFieldsAndScroll },
    } = this.props.username

    validateFieldsAndScroll((err, values) => {
      if (err) return

      this.confirmCode(username, values.code)
    })
  }

  sendCode = () => {
    const hideLoadingMsg = message.loading('Enviando codigo...', 0)
    /* Auth.confirmSignUp(username, code, {
     *   // Optional. Force user confirmation irrespective of existing alias. By default set to True.
     *   forceAliasCreation: true    
     * }) */
    /* Auth.verifyCurrentUserAttribute('email')
     *   .then(() => {
     *     hideLoadingMsg()
     *     message.success('Codigo enviado, mira tus emails')
     *     console.log('a verification code is sent');
     *   }).catch((e) => {
     *     hideLoadingMsg()
     *     message.error('No podia enviar tu codigo')
     *     console.log('failed with error', e);
     *   }); */
  }

  confirmCode = (username, code) => {
    return Auth.confirmSignUp(username, code, {
      forceAliasCreation: true
    })
  }

  /* Auth.verifyCurrentUserAttributeSubmit(attr, 'the_verification_code')
   *   .then(() => {
   *     console.log('phone_number verified');
   *   }).catch(e) => {
   *     console.log('failed with error', e);
   *   }); */

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="Codigo">
          {getFieldDecorator('code', {
             rules: [{
               required: true, message: 'Hay que poner el codigo de confirmacion'
             }],
          })(
             <Input />
           )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Confirmar</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(Confirm)

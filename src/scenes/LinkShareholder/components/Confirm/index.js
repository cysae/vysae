import React from 'react'
// antd
import { Form, Input, Button, message } from 'antd'
// amplify
// amplify
import aws_exports from '../../../../aws-exports';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import {
  CreateUser,
  CreateCompanyUser,
  UpdateShareholder,
  DeleteUser
} from '../../../../graphql/mutations'
const FormItem = Form.Item

class Confirm extends React.Component {
  state = {
    loading: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      user,
      form: { validateFieldsAndScroll },
      companyId,
      shareholderId
    } = this.props

    validateFieldsAndScroll((err, values) => {
      if (err) return

      this.setState({ loading: true })
      this.confirmCode(user.username, values.code)
  .then(() => this.loginUser(user.username, user.password))
      .then(() => this.linkShareholder(user, companyId, shareholderId))
  .catch(err => {
    message.error('error')
    console.error(err)
  })
    })
  }

  confirmCode = (username, code) => {
    return Auth.confirmSignUp(username, code, {
      forceAliasCreation: true
    })
  }

  loginUser = (username, password) => {
    return Auth.signIn(username, password)
  }

  linkShareholder = async (user, companyId, shareholderId) => {
    const { toCompanyDashboard } = this.props
    let userId

    return API.graphql(graphqlOperation(gqlToString(CreateUser), {
      input: { name: user.username }
    })).then(({ data: { createUser }}) => {
      userId = createUser.id
      return Auth.currentAuthenticatedUser();
    }).then((user) => {
      return Promise.all([
        Auth.updateUserAttributes(user, {
          ['custom:userId']: userId,
        }),
        API.graphql(graphqlOperation(gqlToString(UpdateShareholder), {
          input: {
            id: shareholderId,
            shareholderUserId: userId,
          }
        })),
        API.graphql(graphqlOperation(gqlToString(CreateCompanyUser), {
          input: {
            companyUserCompanyId: companyId,
            companyUserUserId: userId,
          }
        }))
      ])
    }).then(() => {
      message.success('Confirmado y vinculado')
      toCompanyDashboard()
    }).catch(err => {
      return API.graphql(graphqlOperation(gqlToString(DeleteUser), {
        input: { id: userId }
      })).then(() => {
        throw err
      })
    }).finally(() => this.setState({ loading: false }))
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props

    const { loading } = this.state

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
          <Button type="primary" htmlType="submit" loading={loading}>Confirmar</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(Confirm)

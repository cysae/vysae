import React, { Component, Fragment } from 'react'
// Antd
import { Form, Button, Divider} from 'antd'
// Redux
import { requestUsersSignUp } from '../actions/index.js'
import { requestCompanyUpdate } from '../actions/index.js'
import { connect } from 'react-redux'
// utils
import { generatePassword } from '../utils/index.js'
// components
import Shareholders from '../components/shareholder'
const FormItem = Form.Item


class ShareholderRegistry extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.registerUsers()
        this.props.next()
      }
    });
  }

  registerUsers() {
    this.userPoolsignUpUsers()
    this.dynamodbSaveUsers()
  }

  dynamodbSaveUsers() {
    const { getFieldValue } = this.props.form

    const body = { shareholders: [] }
    const shareholderIds = getFieldValue('shareholders')
    shareholderIds.forEach((id) => {
      const shareIntervalIds = getFieldValue(`shareholderShareInterval_${id}_ids`)
      const shareIntervals = shareIntervalIds.map(intvlId => {
        return {
          start: getFieldValue(`shareholderShareInterval_${id}_start_${intvlId}`),
          end: getFieldValue(`shareholderShareInterval_${id}_end_${intvlId}`)
        }
      })
      body.shareholders.push({
        dni: getFieldValue(`dni_${id}`),
        shareIntervals
      })
    })

    const companyId = getFieldValue('companyId')
    this.props.requestCompanyUpdate(companyId, body)
  }

  userPoolsignUpUsers() {
    const { getFieldValue } = this.props.form

    const shareholderIds = getFieldValue('shareholders')
    const users = shareholderIds.map((id) => {
      const user = {
        username: getFieldValue(`dni_${id}`),
        password: generatePassword(),
        attributes: {
          email: getFieldValue(`email_${id}`),
          phone_number: getFieldValue(`telefon_${id}`),
          [`custom:firstName`]: getFieldValue(`firstName_${id}`),
          [`custom:lastName`]: getFieldValue(`lastName_${id}`),
          [`custom:permanentAddress`]: getFieldValue(`permanentAddress_${id}`),
          [`custom:nationality`]: getFieldValue(`nationality_${id}`),
          [`custom:type`]: getFieldValue(`personType_${id}`),
        }
      }

      if(getFieldValue(`personType_${id}`) === 'juridic') {
        user['attributes'][`custom:companyName`] = getFieldValue(`companyName_${id}`)
        user['attributes'][`custom:nif`] = getFieldValue(`nif_${id}`)
        user['attributes'][`custom:placeOfBusiness`] = getFieldValue(`placeOfBusiness_${id}`)
        user['attributes'][`custom:companyNationality`] = getFieldValue(`companyNationality_${id}`)
        user['attributes'][`custom:companyRegister`] = getFieldValue(`companyRegister_${id}`)
      }

      return user
    })

    const companyId = getFieldValue('companyId')
    this.props.requestUsersSignUp(users, companyId)
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
    requestCompanyUpdate: (companyId, body) => { dispatch(requestCompanyUpdate(companyId, body)) },
    requestUsersSignUp: (users, companyId) => { dispatch(requestUsersSignUp(users, companyId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareholderRegistry)

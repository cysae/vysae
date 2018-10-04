import React, { Component } from 'react'
// antd
import { Form, Button, message, Row, Col, Select } from 'antd'
// services
import getCompany from '../../../../services/getCompany'
import { compose } from 'recompose'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { UpdateCompany } from '../../../../graphql/mutations'

const FormItem = Form.Item
const Option = Select.Option;

class Administration extends Component {
  componentDidMount() {
    const {
      form: { setFieldsValue },
      company: { president, vicePresident, secretary }
    } = this.props


    if(president)
      setFieldsValue({ president: president.id })
    if(vicePresident)
      setFieldsValue({ vicePresident: vicePresident.id })
    if(secretary)
      setFieldsValue({ secretary: secretary.id })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form : { validateFields },
      match: { params: { companyId }},
    } = this.props

    validateFields((err, values) => {
      if (!err) {
        const hideLoadingMsg = message.loading('Actualizando administrador...')
        API.graphql(graphqlOperation(gqlToString(UpdateCompany), { input: { id: companyId, companyPresidentId: values.president, companyVicePresidentId: values.vicePresident, companySecretaryId: values.secretary }}))
          .then(() => {
            message.success('Administrador actualizado', 2.5)
          })
          .catch(err => console.error(err))
          .finally(() => hideLoadingMsg())
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      company: { users }
    } = this.props

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Row type="flex" justify="space-around">
          <Col span={10}>
            <h3>Junta General (opcional)</h3>
            <FormItem
              label="Presidente"
            >
              {getFieldDecorator('president', {
                 rules: [{ required: false, message: ' ' }],
              })(
                <Select placeholder="Elija un presidente">
                  {users.items.map(({ user }) => <Option key={user.id} value={user.id} selected>{user.name}</Option> )}
                </Select>

              )}
            </FormItem>
            <FormItem
              label="Vicepresidente"
            >
              {getFieldDecorator('vicePresident', {
                 rules: [{ required: false, message: ' ' }],
              })(
                <Select placeholder="Elija un vicepresidente">
                  {users.items.map(({ user }) => <Option key={user.id} value={user.id} selected>{user.name}</Option> )}
                </Select>
              )}
            </FormItem>
            <FormItem
              label="Secretario"
            >
              {getFieldDecorator('secretary', {
                 rules: [{ required: false, message: ' ' }],
              })(
                <Select placeholder="Elija un secretario">
                  {users.items.map(({ user }) => <Option key={user.id} value={user.id} selected>{user.name}</Option> )}
                </Select>
              )}
            </FormItem>
          </Col>


          {/* <Col span={12}>
              <h3>Órgano de Administración</h3>
              <Col span={4}>
              <div>Elegir:</div>
              </Col>
              <Col span={10}>
              <FormItem>
              <Button block>Consejo de Administración</Button>
              </FormItem>
              <FormItem>
              <Button block>Administrador único</Button>
              </FormItem>
              <FormItem>
              <Button block>Administradores mancomunados</Button>
              </FormItem>
              <FormItem>
              <Button block>Administradores solidarios</Button>
              </FormItem>
              </Col>
              </Col> */}
        </Row>
        <Row type="flex" justify="space-around">
          <FormItem>
            <Button type="primary" htmlType="submit" block>
              Guardar
            </Button>
          </FormItem>
        </Row>
      </Form>
    )
  }
}

export default compose(
  Form.create(),
  getCompany,
)(Administration)

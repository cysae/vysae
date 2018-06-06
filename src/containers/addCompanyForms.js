import React, { Component, Fragment } from 'react'
import { Form, InputNumber, Button, Radio, Divider, Mention} from 'antd'
import styled from 'styled-components'
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
// redux
import { connect } from 'react-redux'
import { saveCompanyForm } from '../actions/index'
// utils
import { updateCompany } from '../utils/dynamodb.js'
// components
import DefineAgreementRules from '../components/majorities'
import Shareholders from '../components/shareholder'
import AdministrationOrgans from '../components/administrationOrgans'
Amplify.configure(aws_exports)
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const FormItem = Form.Item

export const MyInputNumber = styled(InputNumber)`
  width: 40% !important;
`

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export function HOCForm(formComponent) {
  return connect((state) => {
    return {
      formState: {
        ...state.companyForm
      }
    }
  })(Form.create({
    onFieldsChange(props, changedFields) {
      props.dispatch(saveCompanyForm(changedFields))
    },
    mapPropsToFields(props) {
      const fields = {};
      for (const key in props.formState) {
        fields[key] = Form.createFormField(props.formState[key])
      }
      return fields;
    },
    onValuesChange(_, values) {
      /* console.log(values); */
    },
  })(formComponent))
}




class RawAgreementRules extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.updateDynamoDB()
        this.props.next()
      }
    });
  }

  async updateDynamoDB() {
    const companyId = '34fbd646-4fa7-4869-b15f-d1344585ebb9'
    const body = {}

    // Ordinary majority
    updateCompany(companyId, body)

    /* const result = await API.post('companyCRUD', '/company', { body }) */
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} layout='inline'>
          <FormItem>
            <span style={{marginRight: 10}}>
              ¿Tu empresa está sometida al régimen legal supletorio establecido en la (LSC)?
            </span>
            {getFieldDecorator('underliesLSC', {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <RadioGroup>
                 <RadioButton value="yes">Sí</RadioButton>
                 <RadioButton value="no">No</RadioButton>
               </RadioGroup>
             )}
          </FormItem>
          <Divider />
          {(getFieldValue('underliesLSC') === 'no') && <DefineAgreementRules form={form} />}
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

class RawShareholderRegistry extends Component {
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

class RawGoverningBodies extends Component {
  constructor(props) {
    super(props)
    this.state = { shareholders: this.getShareholderNames() }
  }

  componentDidMount() {
    this.setState({ shareholders: this.getShareholderNames() })
  }

  getShareholderNames() {
    const { getFieldValue } = this.props.form
    const shareholderKeys = getFieldValue('shareholders')
    const shareholderNames = []
    for (const id of shareholderKeys) {
      const name = (id+1)+'-'+getFieldValue(`${id}_prename`)+'-'+getFieldValue(`${id}_surname`)
      shareholderNames.push(name)
    }
    return shareholderNames
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('save')
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { shareholders } = this.state
    return (
      <Fragment>
        <h2>Junta General</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Presidente"
            {...formItemLayout}
          >
            {getFieldDecorator('president', {
            })(
               <Mention
                 suggestions={shareholders}
               />
             )}
          </FormItem>
          <FormItem
            label="Vicepresidente"
            {...formItemLayout}
          >
            {getFieldDecorator('vicepresident', {
            })(
               <Mention
                 suggestions={shareholders}
               />
             )}
          </FormItem>
          <FormItem
            label="Secretario"
            {...formItemLayout}
          >
            {getFieldDecorator('vicepresident', {
            })(
               <Mention
                 suggestions={shareholders}
               />
             )}
          </FormItem>

          <h2>Órgano de Administración</h2>
      <FormItem
      label="Elige un órgano"
      {...formItemLayout}
      >
      {getFieldDecorator('adminstrationOrganType', {
        rules: [{
          required: true,
          message: 'Este campo es obligatorio.',
        }]
      })(
        <RadioGroup>
          <RadioButton value="boardOfDirectors">Consejo de Administracíon</RadioButton>
          <RadioButton value="soleAdministrator">Administrador único</RadioButton>
          <RadioButton value="jointAdministrators">Administradores mancomunados</RadioButton>
          <RadioButton value="solidarityAdministrators">Administradores solidarios</RadioButton>
        </RadioGroup>
      )}
      </FormItem>
      <AdministrationOrgans type={getFieldValue('adminstrationOrganType')} shareholders={shareholders} />

      <Divider/>
      <FormItem>
        <Button type="primary" onClick={this.props.prev}>
          Atrás
        </Button>
        <Button type="primary" htmlType="submit">
          Guardar
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

export const AgreementRules = HOCForm(RawAgreementRules)
export const ShareHolderRegistry = HOCForm(RawShareholderRegistry)
export const GoverningBodies = HOCForm(RawGoverningBodies)

import React, { Component, Fragment } from 'react'
// antd
import { Form, Button, Radio, Divider, Select} from 'antd'
// redux
import { connect } from 'react-redux'
import {
  requestCompanyUpdate,
  requestUsersToCompanyAdmin,
} from '../actions/index.js'
// components
import AdministrationOrgans from '../components/administrationOrgans'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const FormItem = Form.Item
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

function ShareholderSelect(props) {
  const { shareholders, multiple, form, label, fieldId} = props
  const { getFieldDecorator } = form
  const mode = multiple ? 'multiple' : 'default'
  return (
    <FormItem
      label={label}
      {...formItemLayout}
    >
      {getFieldDecorator(fieldId, {
      })(
         <Select
           mode={mode}
           showSearch
           placeholder="Seleccionar una persona"
           optionFilterProp="children"
           filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
           >
           {shareholders.map(shareholder => {
              return <Option key={shareholder.dni} value={shareholder.dni}>{`${shareholder.dni}: ${shareholder.firstName} ${shareholder.lastName}`}</Option>
           })}
         </Select>
       )}
    </FormItem>
  )
}

class GoverningBodies extends Component {
  constructor(props) {
    super(props)
    /* this.state = { shareholders: this.getShareholders() } */
    this.state = { shareholders: [{
      dni: 'y687', firstName: 'Javier', lastName: 'Pascual'
    }, {
      dni: 'y821', firstName: 'Antonio', lastName: 'Vázquez'
    }, {
      dni: 'y231', firstName: 'Goncho', lastName: 'García Valdecasas'
    }]}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.updateUsersDynamodb()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.updateCompanyDynamodb()
        this.updateUsersDynamodb()

        console.log('save')
      }
    });
  }

  updateCompanyDynamodb() {
    const { getFieldValue } = this.props.form

    const body = {
      president: getFieldValue('president'),
      vicePresident: getFieldValue('vicePresident'),
      secretary: getFieldValue('secretary'),
    }

    const companyId = this.props.form.getFieldValue('companyId')
    this.props.requestCompanyUpdate(companyId, body)
  }

  updateUsersDynamodb() {
    const { shareholders } = this.state

    const companyId = this.props.form.getFieldValue('companyId')
    this.props.requestUsersToCompanyAdmin(shareholders, companyId)
  }


  getShareholders() {
    const { getFieldValue } = this.props.form

    const shareholderIds = getFieldValue('shareholders')
    return shareholderIds.map((id) => {
      return {
        dni: getFieldValue(`dni_${id}`),
        firstName: getFieldValue(`firstName_${id}`),
        lastName: getFieldValue(`lastName_${id}`),
      }
    })
  }

  componentDidMount() {
    /* this.setState({ shareholders: this.getShareholderNames() }) */
  }


  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const { shareholders } = this.state

    return (
      <Fragment>
        <h2>Junta General</h2>
        <Form onSubmit={this.handleSubmit}>
          <ShareholderSelect
            label="Presidente"
            fieldId="president"
            shareholders={shareholders}
            form={form}
          />
          <ShareholderSelect
            label="Vicepresidente"
            fieldId="vicePresident"
            shareholders={shareholders}
            form={form}
          />
          <ShareholderSelect
            label="Secretario"
            fieldId="secretary"
            shareholders={shareholders}
            form={form}
          />

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
      <AdministrationOrgans type={getFieldValue('adminstrationOrganType')} shareholders={shareholders} form={form}/>

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

const mapStateToProps = state => {}
const mapDispatchToProps = dispatch => {
  return {
    requestCompanyUpdate: (companyId, body) => { dispatch(requestCompanyUpdate(companyId, body)) },
    requestUsersToCompanyAdmin: (users, companyId) => { dispatch(requestUsersToCompanyAdmin(users, companyId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoverningBodies)

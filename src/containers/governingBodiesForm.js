import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
// antd
import { Form, InputNumber, Button, Radio, Divider, Select, Mention} from 'antd'
// redux
import { connect } from 'react-redux'
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
  const { shareholders, multiple } = props
  const mode = multiple ? 'multiple' : 'default'
  return (
    <Select
      mode={mode}
      showSearch
      placeholder="Seleccionar un presidente"
      optionFilterProp="children"
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {shareholders.map(shareholder => {
         return <Option key={shareholder.dni} value={shareholder.dni}>{`${shareholder.dni}: ${shareholder.firstName} ${shareholder.lastName}`}</Option>
      })}
    </Select>
  )
}
export default class GoverningBodies extends Component {
  constructor(props) {
    super(props)
    /* this.state = { shareholders: this.getShareholderNames() } */
    this.state = { shareholders: [{
      dni: 'y4310687h',
      firstName: 'Dirk',
      lastName: 'Hornung'
    }, {
      dni: 'yh4310687h',
      firstName: 'Dirk',
      lastName: 'Hornung'
    }]}
  }

  componentDidMount() {
    /* this.setState({ shareholders: this.getShareholderNames() }) */
  }

  getShareholderNames() {
    /* const { getFieldValue } = this.props.form
     * const shareholderKeys = getFieldValue('shareholders')
     * const shareholderNames = []
     * for (const id of shareholderKeys) {
     *   const name = (id+1)+'-'+getFieldValue(`${id}_prename`)+'-'+getFieldValue(`${id}_surname`)
     *   shareholderNames.push(name)
     * }
     * return shareholderNames */
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
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form
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
               <ShareholderSelect shareholders={shareholders} />
             )}
          </FormItem>
          <FormItem
            label="Vicepresidente"
            {...formItemLayout}
          >
            {getFieldDecorator('vicepresident', {
            })(
               <ShareholderSelect shareholders={shareholders} />
             )}
          </FormItem>
          <FormItem
            label="Secretario"
            {...formItemLayout}
          >
            {getFieldDecorator('secretario', {
            })(
               <ShareholderSelect shareholders={shareholders} multiple/>
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

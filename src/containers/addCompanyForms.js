import React, { Component, Fragment } from 'react'
import { Form, Input, InputNumber, Button, Radio, Divider, Mention, Row, Col, Alert} from 'antd'
import styled from 'styled-components'
import { API } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
// redux
import { connect } from 'react-redux'
import { saveCompanyForm } from '../actions/index'
// components
import ShareIntervalFields from '../components/shareIntervalFields'
import ShareIntervalValueFields from '../components/shareIntervalValueFields'
import ShareSuffrageFields from '../components/shareSuffrageFields'
import DefineAgreementRules from '../components/majorities'
import Shareholders from '../components/shareholder'
import AdministrationOrgans from '../components/administrationOrgans'
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

class RawBasicForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.save()
        this.props.next()
      }
    });
  }

  async save() {
    const { getFieldValue } = this.props.form
    const companyId = uuid()
    const name = getFieldValue('name')
    const placeOfBusiness = getFieldValue('placeOfBusiness')
    const nif = getFieldValue('nif')

    const body = {
      uuid: companyId,
      name,
      placeOfBusiness,
      nif,
    }
    const result = await API.put('companyCRUD', '/company', { body })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem
          label="Denominación social"
        >
          {getFieldDecorator('name', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="Domicilio Social"
        >
          {getFieldDecorator('placeOfBusiness', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="NIF"
        >
          {getFieldDecorator('nif', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(<Input />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Continuar
          </Button>
        </FormItem>
      </Form>
    );
  }
}


class RawSharesForm extends Component {
  state = {
    error: null
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && this.isExtraValid()) {
        this.props.next()
      }
    });
  }

  handleErrorClose = () => {
    console.log('close')
    this.setState({ error: null })
  }

  isExtraValid() {
    const { getFieldValue } = this.props.form
    const capital = getFieldValue('capital')
    const totalShareNumber = getFieldValue('numberOfShares')

    // total share number
    let totalShareIntervalNumber = 0
    const shareIntervalIds = getFieldValue('shareInterval_ids')
    for (const id of shareIntervalIds) {
      totalShareIntervalNumber += Math.abs(getFieldValue(`shareInterval_begin_${id}`)-getFieldValue(`shareInterval_end_${id}`))+1
    }


    // number of shares have to coincide
    if (totalShareNumber !== totalShareIntervalNumber) {
      this.setState({ error: `El numero total de las participaciones (${totalShareNumber}) no coincide con la suma sobre las numeraciones (${totalShareIntervalNumber}).` })
      return false
    }

    // social capital has to coincide with shares and their corresponding values
    let totalShareValue = 0
    const sharesHaveSameValue = getFieldValue('sharesHaveSameValue')
    if(sharesHaveSameValue === 'no') {
      const shareValueTypeIds = getFieldValue('shareValueType_ids')
      for(const valueTypeId of shareValueTypeIds) {
        const shareValue = getFieldValue(`shareValue_${valueTypeId}`)
        const shareIntervalIds = getFieldValue(`shareValueType_${valueTypeId}_ids`)
        for(const id of shareIntervalIds) {
          const shareCountOfInterval = Math.abs(
            getFieldValue(`shareValueType_${valueTypeId}_begin_${id}`)-getFieldValue(`shareValueType_${valueTypeId}_end_${id}`)
          )+1
          totalShareValue += shareCountOfInterval*shareValue
        }
      }

      if(capital !== totalShareValue) {
        this.setState({
          error: `La suma del valor de las participaciones (${totalShareValue}€) no coincide con el capital social.`
        })
        return false
      }
    }

    return true
  }


  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form;

    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Capital social"
            labelCol={{span: 12}}
          >
            {getFieldDecorator('capital', {
               rules: [
                 {pattern: /^.*$/, message: 'Tiene que ser un número entero positivo'},
                 {required: true, message: 'Este campo es obligatorio'},
               ],
            })(
               <MyInputNumber min={1} formatter={value => `${value}€`} parser={value => value.replace('€', '')} />
            )}
          </FormItem>
          <FormItem
            label="Número de participaciones"
            labelCol={{span: 12}}
          >
            {getFieldDecorator('numberOfShares', {
               rules: [
                 {required: true, message: 'Este campo es obligatorio.'},
                 {pattern: /^\d*$/, message: 'Tiene que ser un número entero positivo'},
               ],
            })(<MyInputNumber min={1} />)}
          </FormItem>
          <Row>
            <Col offset={12} span={12}>
              <ShareIntervalFields form={form} />
            </Col>
          </Row>
          <Divider />

          <FormItem
            label="¿Tienen todas las participaciones el mismo valor nominal?"
            labelCol={{span: 12}}
          >
            {getFieldDecorator('sharesHaveSameValue', {
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
          {getFieldValue('sharesHaveSameValue') === 'no' && (
             <ShareIntervalValueFields form={form} />
          )}
          <Divider />

          <FormItem
            label="¿Todas las participaciones tienen el mismo derecho de voto?"
            labelCol={{span: 12}}
          >
            {getFieldDecorator('sharesHaveEqualSuffrage', {
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
          {(getFieldValue('sharesHaveEqualSuffrage') === 'no') && <ShareSuffrageFields form={form} />}
          <Divider />

          <FormItem
            label="¿Hay acciones en autocartera?"
            labelCol={{span: 12}}
          >
            {getFieldDecorator('hasTreasuryShares', {
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
          {(getFieldValue('hasTreasuryShares') === 'yes') ? (
             <Row>
               <Col offset={12}>
                 <ShareIntervalFields form={form} fieldId="treasuryShareIntervals" />
               </Col>
             </Row>
          ) : null}
          <Divider />

          {
            this.state.error ? (
              <Alert
                type="error"
                message={this.state.error}
                closable
                banner
                afterClose={this.handleErrorClose}
              />
            ) : null
          }

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

class RawAgreementRules extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.next()
      }
    });
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
      if (!err) {
        this.props.next()
      }
    });
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form;
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

export const BasicForm = HOCForm(RawBasicForm)
export const SharesForm = HOCForm(RawSharesForm)
export const AgreementRules = HOCForm(RawAgreementRules)
export const ShareHolderRegistry = HOCForm(RawShareholderRegistry)
export const GoverningBodies = HOCForm(RawGoverningBodies)

import React, { Component, Fragment } from 'react'
import { Form, Input, Divider, Radio, Button, Icon } from 'antd'
import ShareholderRegistryOperationFields from './shareholderRegistryOperationFields'
import { formItemLayout } from '../containers/addCompanyForms'
import PropTypes from 'prop-types'
import styled from 'styled-components'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const Container = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: #f1f1f1;
`
const MyDivider = styled(Divider)`
  border-color: black !important;
  &:before {
    border-color: black !important;
  }
  &:after {
    border-color: black !important;
  }
`

class Shareholder extends Component {
  render() {
    const { form, id, removeShareholder } = this.props
    const { getFieldDecorator, getFieldValue } = form;
    const personType = getFieldValue(`${id}_personType`)
    const shareholderKeys = getFieldValue(`shareholders`)

    return (
      <Fragment>
        <MyDivider orientation="left">
          {`${id+1}. Persona`}
          {shareholderKeys.length > 1 ? (
             <Icon style={{marginLeft: 10}} type="minus-circle-o" onClick={() => removeShareholder(id)}/>
          ) : null}
        </MyDivider>
        <FormItem
          label="Persona "
          {...formItemLayout}
        >
          {getFieldDecorator(`${id}_personType`, {
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <RadioGroup>
               <RadioButton value="physical">Física</RadioButton>
               <RadioButton value="juridic">Jurídica</RadioButton>
             </RadioGroup>
           )}
        </FormItem>

          {/* jurdic person */}
          {(personType === 'juridic') && (
             <Fragment>
               <h3>Persona jurídica</h3>
               <FormItem
                 label="Denominación social"
                 {...formItemLayout}
               >
                 {getFieldDecorator(`${id}_companyName`, {
                    rules: [{
                      required: true,
                      message: 'Este campo es obligatorio.',
                    }]
                 })(
                    <Input />
                  )}
               </FormItem>
               <FormItem
                 label="NIF"
                 {...formItemLayout}
               >
                 {getFieldDecorator(`${id}_nif`, {
                    rules: [{
                      required: true,
                      message: 'Este campo es obligatorio.',
                    }]
                 })(
                    <Input />
                  )}
               </FormItem>
               <FormItem
                 label="Domicilio social"
                 {...formItemLayout}
               >
                 {getFieldDecorator(`${id}_placeOfBusiness`, {
                    rules: [{
                      required: true,
                      message: 'Este campo es obligatorio.',
                    }]
                 })(
                    <Input />
                  )}
               </FormItem>
               <FormItem
                 label="Nacionalidad"
                 {...formItemLayout}
               >
                 {getFieldDecorator(`${id}_companyNationality`, {
                    rules: [{
                      required: true,
                      message: 'Este campo es obligatorio.',
                    }]
                 })(
                    <Input />
                  )}
               </FormItem>
               <FormItem
                 label="Datos de registro"
                 {...formItemLayout}
               >
                 {getFieldDecorator(`${id}_companyRegister`, {
                    rules: [{
                      required: true,
                      message: 'Este campo es obligatorio.',
                    }]
                 })(
                    <Input />
                  )}
               </FormItem>
             </Fragment>
          )}

        <h3>
          Persona física
          {personType == 'juridic' && (' representante')}
        </h3>
          <FormItem
            label="Nombre"
            {...formItemLayout}
          >
            {getFieldDecorator(`${id}_prename`, {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <Input />
             )}
          </FormItem>
          <FormItem
            label="Apellidos"
            {...formItemLayout}
          >
            {getFieldDecorator(`${id}_surname`, {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <Input />
             )}
          </FormItem>
          <FormItem
            label="DNI"
            {...formItemLayout}
          >
            {getFieldDecorator(`${id}_dni`, {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <Input />
             )}
          </FormItem>
          <FormItem
            label="Domiciolio"
            {...formItemLayout}
          >
            {getFieldDecorator(`${id}_permanentAddress`, {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <Input />
             )}
          </FormItem>
          <FormItem
            label="Nacionalidad"
            {...formItemLayout}
          >
            {getFieldDecorator(`${id}_nationality`, {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <Input />
             )}
          </FormItem>
          <FormItem
            label="Email"
            {...formItemLayout}
          >
            {getFieldDecorator(`${id}_email`, {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <Input />
             )}
          </FormItem>
          <Divider dashed/>


          <ShareholderRegistryOperationFields id={id} form={form} />

      </Fragment>
    )
  }
}

Shareholder.propTypes = {
  form: PropTypes.object.isRequired,
}

class Shareholders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0
    }

    props.form.getFieldDecorator(`shareholders`, { initialValue: [] })
  }

  componentDidMount() {
    const numberOfShareholders = this.props.form.getFieldValue(`shareholders`).length
    if (numberOfShareholders === 0) {
      this.addShareholder()
    }
  }

  addShareholder = () => {
    const { getFieldValue, setFieldsValue } = this.props.form
    const { id } = this.state
    const shareholders = getFieldValue(`shareholders`);
    const nextShareholders = shareholders.concat(id);
    this.setState({ id: id+1 })
    const fieldsValue = {}
    fieldsValue[`shareholders`] = nextShareholders
    setFieldsValue(fieldsValue)
  }

  removeShareholder = (id) => {
    const { form } = this.props
    const shareholderKeys = form.getFieldValue(`shareholders`);
    if (shareholderKeys.length === 1) {
      return;
    }
    const nextShareholderKeys = {}
    nextShareholderKeys[`shareholders`] = shareholderKeys.filter(key => key !== id)

    form.setFieldsValue(nextShareholderKeys);
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const { id } = this.state
    const shareholderKeys = getFieldValue(`shareholders`)
    const shareholders = shareholderKeys.map((id) => {
      return (
        <Shareholder
          key={id}
          id={id}
          form={form}
          removeShareholder={this.removeShareholder}
        />
      )
    })

    return (
      <Container>
        {shareholders}
        <FormItem style={{margin: 0}}>
          <Button type="dashed" onClick={this.addShareholder} style={{width: '100%'}}>
            <Icon type="plus" /> Añadir socio
          </Button>
        </FormItem>
      </Container>
    )
  }
}

export default Shareholders

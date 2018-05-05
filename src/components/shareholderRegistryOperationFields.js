import React, { Component, Fragment } from 'react'
import { Form, Input, Button, Icon, Radio, Divider } from 'antd'
import ShareIntervalFields from './shareIntervalFields'
import { HOCForm, formItemLayout } from '../containers/addCompanyForms'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class RawShareholderRegistryOperationFields extends Component {
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <Fragment>
        <h3>Persona Física</h3>
        <FormItem
          label="Nombre"
          {...formItemLayout}
        >
          {getFieldDecorator('prename', {
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
          {getFieldDecorator('prename', {
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
          {getFieldDecorator('prename', {
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
          {getFieldDecorator('prename', {
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
          {getFieldDecorator('prename', {
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
          {getFieldDecorator('prename', {
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <Input />
           )}
        </FormItem>
        <Divider dashed/>

        {/* jurdic person */}
        {(this.props.personType === 'juridic') && (
           <Fragment>
             <h3>Persona Jurídica</h3>
             <FormItem
               label="Denominación social"
               {...formItemLayout}
             >
               {getFieldDecorator('prename', {
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
               {getFieldDecorator('prename', {
                  rules: [{
                    required: true,
                    message: 'Este campo es obligatorio.',
                  }]
               })(
                  <Input />
                )}
             </FormItem>
             <FormItem
               label="Domicilio"
               {...formItemLayout}
             >
               {getFieldDecorator('prename', {
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
               {getFieldDecorator('prename', {
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
               {getFieldDecorator('prename', {
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
      </Fragment>
    )
  }
}

export default HOCForm(RawShareholderRegistyOperationFields)

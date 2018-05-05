import React, { Component, Fragment } from 'react'
import { Form, Input, Divider } from 'antd'
import ShareholderRegistryOperationFields from './shareholderRegistryOperationFields'
import { HOCForm, formItemLayout } from '../containers/addCompanyForms'
const FormItem = Form.Item

class RawShareholderFields extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

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
          {getFieldDecorator('surname', {
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
          {getFieldDecorator('dni', {
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
          {getFieldDecorator('permanentAddress', {
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
          {getFieldDecorator('nationality', {
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
          {getFieldDecorator('email', {
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
               {getFieldDecorator('companyName', {
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
               {getFieldDecorator('nif', {
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
               {getFieldDecorator('placeOfBusiness', {
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
               {getFieldDecorator('companyNationality', {
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
               {getFieldDecorator('companyRegister', {
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

        <ShareholderRegistryOperationFields />
      </Fragment>
    )
  }
}

export default HOCForm(RawShareholderFields)

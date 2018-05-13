import React, { Component, Fragment } from 'react'
import { Form, Input, Divider } from 'antd'
import ShareholderRegistryOperationFields from './shareholderRegistryOperationFields'
import { formItemLayout } from '../containers/addCompanyForms'
import PropTypes from 'prop-types'
const FormItem = Form.Item

class ShareholderFields extends Component {
  render() {
    const { form } = this.props
    const { getFieldDecorator } = form;

    return (
      <Fragment>
        <h3>Attributos Persona Física</h3>
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
             <h3>Attributos Persona Jurídica</h3>
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

        <ShareholderRegistryOperationFields form={form} />
      </Fragment>
    )
  }
}

ShareholderFields.propTypes = {
  form: PropTypes.object.isRequired,
}

export default ShareholderFields

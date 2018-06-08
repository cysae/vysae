import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Form, Mention } from 'antd'

const FormItem = Form.Item

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

class BoardOfDirectors extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const { shareholders } = this.props

    return (
      <Fragment>
        <h3>Consejo de Administración</h3>
          <FormItem
            label="Presidente"
            {...formItemLayout}
          >
            {getFieldDecorator('boardOfDirectorsPresident', {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
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
            {getFieldDecorator('boardOfDirectorsVicepresident', {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
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
            {getFieldDecorator('boardOfDirectorsSecretario', {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <Mention
                 suggestions={shareholders}
               />
             )}
          </FormItem>
          <FormItem
            label="Consejeros"
            {...formItemLayout}
          >
            {getFieldDecorator('boardOfDirectorsAdvisors', {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <Mention
                 suggestions={shareholders}
               />
             )}
          </FormItem>
      </Fragment>
    )
  }
}

class SoleAdministrator extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const { shareholders } = this.props

    return (
      <Fragment>
        <h3>Administrador único</h3>
          <FormItem
            label="Presidente"
            {...formItemLayout}
          >
            {getFieldDecorator('soleAdministratorPresident', {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <Mention
                 suggestions={shareholders}
               />
             )}
          </FormItem>
      </Fragment>
    )
  }
}

class JointAdministrators extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const { shareholders } = this.props

    return (
      <Fragment>
        <h3>Administrador mancomunados</h3>
        <FormItem
          label="Presidente"
          {...formItemLayout}
        >
          {getFieldDecorator('soleAdministrators', {
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <Mention
               suggestions={shareholders}
             />
           )}
        </FormItem>
      </Fragment>
    )
  }
}

class SolidarityAdministrators extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const { shareholders } = this.props

    return (
      <Fragment>
        <h3>Administrador solidarios</h3>
        <FormItem
          label="Administradores solidarios"
          {...formItemLayout}
        >
          {getFieldDecorator('solidarityAdministrators', {
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <Mention
               suggestions={shareholders}
             />
           )}
        </FormItem>
      </Fragment>
    )
  }
}

export default class AdministrationOrgans extends Component {
  render() {
    let { shareholders, type, form } = this.props

    return (null)
    /* switch(type) {
     *   case 'boardOfDirectors':
     *     return <BoardOfDirectors shareholders={shareholders} form={form} />
     *   case 'soleAdministrator':
     *     return <SoleAdministrator shareholders={shareholders} form={form} />
     *   case 'jointAdministrators':
     *     return <JointAdministrators shareholders={shareholders} form={form} />
     *     case 'solidarityAdministrators':
     *     return <SolidarityAdministrators shareholders={shareholders} form={form} />
     *   default:
     *     return (null)
     * } */
  }
}


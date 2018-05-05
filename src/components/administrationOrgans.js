import React, { Component, Fragment } from 'react'
import { Form, Mention } from 'antd'
import { HOCForm, formItemLayout } from '../containers/addCompanyForms'
const FormItem = Form.Item

class RawBoardOfDirectors extends Component {
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

class RawSoleAdministrator extends Component {
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

class RawJointAdministrators extends Component {
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

class RawSolidarityAdministrators extends Component {
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

class RawAdministrationOrgans extends Component {
  render() {
    const { shareholders, type } = this.props
    switch(type) {
      case 'boardOfDirectors':
        return <BoardOfDirectors shareholders={shareholders} />
      case 'soleAdministrator':
        return <SoleAdministrator shareholders={shareholders} />
      case 'jointAdministrators':
        return <JointAdministrators shareholders={shareholders} />
        case 'solidarityAdministrators':
        return <SolidarityAdministrators shareholders={shareholders} />
      default:
        return (null)
    }
  }
}

const BoardOfDirectors = HOCForm(RawBoardOfDirectors)
const SoleAdministrator = HOCForm(RawSoleAdministrator)
const JointAdministrators = HOCForm(RawJointAdministrators)
const SolidarityAdministrators = HOCForm(RawSolidarityAdministrators)
export default HOCForm(RawAdministrationOrgans)

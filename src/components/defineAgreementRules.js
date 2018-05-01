import React, { Component, Fragment } from 'react'
import { Form, InputNumber, Button, Icon, Radio, Divider, Select } from 'antd'
import ShareIntervalFields from './shareIntervalFields'
import { HOCForm, formItemLayout } from '../containers/addCompanyForms'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Option = Select.Option

function agreementOptions(props) {
  const { getFieldDecorator, getFieldValue } = props.form;

  return (
    <Fragment>
        <FormItem
          {...formItemLayout}
        >
          <span>Se requiere el voto favorable de, al menos, el </span>
          {getFieldDecorator('minimumRatioOfVotingShares', {
             initialValue: 33.33,
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <InputNumber
               min={33.33}
               max={100}
               formatter={value => `${value}%`}
               parser={value => value.replace('%', '')}
             />
           )}
          <span> de los votos correspondientes a las participaciones sociales en que se divida el capital social.</span>
        </FormItem>
        <Divider dashed />

        <FormItem
          {...formItemLayout}
        >
          <span>Se requiere el voto favorable de, al menos, el </span>
          {getFieldDecorator('minimumRatioOfVotes', {
             initialValue: 0,
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <InputNumber
               min={0}
               max={100}
               formatter={value => `${value}%`}
               parser={value => value.replace('%', '')}
             />
           )}
          <span>  de los votos emitidos, siempre que dichos votos representen un mínimo del </span>
          {getFieldDecorator('minimumRatioOfShareCapital', {
             initialValue: 0,
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <InputNumber
               min={0}
               max={100}
               formatter={value => `${value}%`}
               parser={value => value.replace('%', '')}
             />
           )}
          <span> del capital social </span>
          {getFieldDecorator('typeOfShareCapital', {
             initialValue: 'total',
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <RadioGroup>
               <RadioButton value="total">total</RadioButton>
               <RadioButton value="withRightToVote">con derecho a voto</RadioButton>
             </RadioGroup>
           )}
        </FormItem>
        <Divider dashed />

        <FormItem
          {...formItemLayout}
        >
          <span>¿Se requiere, además, el voto favorable de un número mínimo de socios?</span>
          {getFieldDecorator('hasMinNumberOfAssociates', {
             initialValue: 'no',
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <RadioGroup>
               <RadioButton value="yes">sí</RadioButton>
               <RadioButton value="no">no</RadioButton>
             </RadioGroup>
           )}
          <span> de los votos correspondientes a las participaciones sociales en que se divida el capital social.</span>
        </FormItem>
        {(getFieldValue('hasMinNumberOfAssociates') === 'yes') && (
           <FormItem
             {...formItemLayout}
             >
             <span>Además, se requiere el voto favorable de, al menos, </span>
             {getFieldDecorator('minimumRatioOfAssociates', {
                initialValue: 0,
                rules: [{
                  required: true,
                  message: 'Este campo es obligatorio.',
                }]
             })(
                <InputNumber
                  min={0}
                  max={100}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                />
              )}
             <span>de los socios </span>
             {getFieldDecorator('typeOfAssociateRatio', {
                initialValue: 'total',
                rules: [{
                  required: true,
                  message: 'Este campo es obligatorio.',
                }]
             })(
                <RadioGroup>
                  <RadioButton value="total">totales</RadioButton>
                  <RadioButton value="withVotingRight">con derecho a voto</RadioButton>
                </RadioGroup>
              )}
           </FormItem>
        ) }
        <Divider dashed />
        <FormItem
          {...formItemLayout}
        >
          <span>Los votos en blanco se computarán. </span>
          {getFieldDecorator('takesBlankVotesIntoAccount', {
             initialValue: 'no',
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <RadioGroup>
               <RadioButton value="yes">sí</RadioButton>
               <RadioButton value="no">no</RadioButton>
             </RadioGroup>
           )}
        </FormItem>
    </Fragment>
  )
}


class RawDefineAgreementRules extends Component {
  state = {
    agreementTypes: [
      'Aumento o reducción de capital',
      'Autorización a administradores para que se dediquen a actividad inmersa en el objecto social',
      'Autorización a administradores para que se dediquen a actividad inmersa en el objeto social',
      'Exclusión y separación de socios',
      'Cambio de domicilio',
      'Supresión o limitación del derecho de prederencia en aumentos de capital',
      'Modificación estructural',
      'Cesión global de activo y pasivo',
    ]
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { agreementTypes } = this.state

    return (
      <Fragment>
        <h3>Mayoría ordinaria</h3>
        <FormItem
          {...formItemLayout}
        >
          <span>
            Se requiere el voto favorable de la mayoría simple de los votos correspondientes a las participaciones sociales en que se divida el capital social.
          </span>
        </FormItem>
        <Divider dashed />
        {agreementOptions( {form: this.props.form} )}
        <Divider />

        <h3>Mayoría Reforzada</h3>
        <FormItem
          {...formItemLayout}
        >
          <span>Los votos en blanco se computarán. </span>
          {getFieldDecorator('selectedReinforcedAgreementTypes', {
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <Select
               mode="multiple"
               style={{ width: '100%' }}
               placeholder="Selecciona"
               >
               {agreementTypes.map((type) => <Option key={type}>{type}</Option>)}
             </Select>
           )}
        </FormItem>
      </Fragment>
    )
  }
}

export default HOCForm(RawDefineAgreementRules)


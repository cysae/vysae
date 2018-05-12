import React, { Component, Fragment } from 'react'
import { Form, Input, InputNumber, Radio, Divider, Select } from 'antd'
import { HOCForm, formItemLayout } from '../containers/addCompanyForms'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Option = Select.Option
const Search = Input.Search

function agreementOptions(props) {
  const { getFieldDecorator, getFieldValue } = props.form
  const { containsRelativeMajority } = props

  return (
    <Fragment>
    <FormItem>
    {getFieldDecorator('majorityType', {
      rules: [{
        required: true, message: 'este campo es obligatorio.',
      }]
    })(
      <RadioGroup>
        {containsRelativeMajority && <RadioButton value="relativeMajority">mayoría simple</RadioButton>}
        <RadioButton value="favorableMajority">mayoría favorable</RadioButton>
        <RadioButton value="favorableMajorityWithMinimum">mayoría favorable con minimum</RadioButton>
      </RadioGroup>
    )}
    </FormItem>

    { getFieldValue('majorityType') === 'relativeMajority' && (
      <Fragment>
        <FormItem>
          <span>
            Se requiere el voto favorable de la mayoría simple de los votos correspondientes a las participaciones sociales en que se divida el capital social.
          </span>
        </FormItem>
        <Divider dashed />
      </Fragment>
    )}

    {getFieldValue('majorityType') === 'favorableMajority' && (
      <Fragment>
      <FormItem>
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
      </Fragment>
    )}

    {getFieldValue('majorityType') === 'favorableMajorityWithMinimum' && (
      <Fragment>
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
      </Fragment>
    )}

        <FormItem
          {...formItemLayout}
        >
          <span>¿Se requiere, además, el voto favorable de un número mínimo de socios?</span>
          {getFieldDecorator('hasMinNumberOfAssociates', {
             initialvalue: 'no',
             rules: [{
               required: true,
               message: 'este campo es obligatorio.',
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
    addAgreementInput: null,
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

  handleAddAgreementInput = (e) => {
    this.setState({ addAgreementInput: e.target.value })
  }

  addAgreementType = (agreementType) => {
    if(agreementType.length !== 0) {
      let selectedReinforcedAgreementTypes = this.props.form.getFieldValue('selectedReinforcedAgreementTypes')
      if(!selectedReinforcedAgreementTypes) {
        selectedReinforcedAgreementTypes = []
      }
      const agreementTypeOptions = this.state.agreementTypes;

      // check if type is already in selected
      let isAlreadySelected = false
      for (const type of selectedReinforcedAgreementTypes) {
        if(type === agreementType) {
          isAlreadySelected = true
          break
        }
      }

      // check if type is already in selection list
      let isAlreadyInSelectOptions = false
      for (const option of agreementTypeOptions) {
        console.log(option)
        if(option === agreementType) {
          isAlreadyInSelectOptions = true
          break
        }
      }

      if(!isAlreadyInSelectOptions) {
        // add to select options
        agreementTypeOptions.push(agreementType)
        this.setState({
          addAgreementInput: null,
          agreementTypes: agreementTypeOptions,
        })
      }

      if(!isAlreadySelected) {
        // mark as selected
        selectedReinforcedAgreementTypes.push(agreementType)
        this.props.form.setFields({
          selectedReinforcedAgreementTypes: {
            value: selectedReinforcedAgreementTypes
          }
        })
        if(isAlreadyInSelectOptions) {
          this.setState({ addAgreementInput: null })
        }
      }

    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { agreementTypes, addAgreementInput } = this.state

    return (
      <Fragment>
        <h3>Mayoría ordinaria</h3>
        {agreementOptions( {form: this.props.form, containsRelativeMajority: true } )}
        <Divider />

        <h3>Mayoría Reforzada</h3>
        <FormItem>
          <span>Los votos en blanco se computarán. </span>
          {getFieldDecorator('selectedReinforcedAgreementTypes', {
             rules: [{
               required: true,
               message: 'Este campo es obligatorio.',
             }]
          })(
             <Select
               mode="multiple"
               placeholder="Selecciona"
               style={{width: '100%'}}
               >
               {agreementTypes.map((type) => <Option key={type}>{type}</Option>)}
             </Select>
           )}
          <Search
            placeholder="Introducir más tipos de acuerdos"
            onChange={this.handleAddAgreementInput}
            onSearch={this.addAgreementType}
            value={addAgreementInput}
            enterButton="Añadir Tipo de Acuerdo"
          />

          {agreementOptions({ form: this.props.form, containsRelativeMajority: false })}
        </FormItem>
      </Fragment>
    )
  }
}

export default HOCForm(RawDefineAgreementRules)


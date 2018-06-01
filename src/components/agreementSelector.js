import React, { Component, Fragment } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'
const FormItem = Form.Item
const Search = Input.Search
const { Option, OptGroup } = Select

export default class AgreementSelector extends Component {
  state = {
    selectedAgreements: ['test1', 'test2'],
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
    ],
  }

  handleAddAgreementInput = (e) => {
    this.setState({ addAgreementInput: e.target.value })
  }

  addAgreementType = (agreementType) => {
    const { fieldId } = this.props

    if(agreementType.length !== 0) {
      let selectedAgreements = this.props.form.getFieldValue(fieldId)
      if(!selectedAgreements) {
        selectedAgreements = []
      }
      const agreementTypeOptions = this.state.agreementTypes;

      // check if type is already in selected
      let isAlreadySelected = false
      for (const type of selectedAgreements) {
        if(type === agreementType) {
          isAlreadySelected = true
          break
        }
      }

      // check if type is already in selection list
      let isAlreadyInSelectOptions = false
      for (const option of agreementTypeOptions) {
        if(option === agreementType) {
          isAlreadyInSelectOptions = true
          break
        }
      }

      if(!isAlreadyInSelectOptions) {
        // add to select options
        const selectedDict = { }
        selectedDict[fieldId] = selectedAgreements.concat([agreementType])
        console.log(selectedDict)
        this.props.form.setFieldsValue(selectedDict)

        agreementTypeOptions.push(agreementType)
        this.setState({
          addAgreementInput: null,
          agreementTypes: agreementTypeOptions,
        })
      }

      if(!isAlreadySelected) {
        // mark as selected
        selectedAgreements.push(agreementType)
        this.props.form.setFields({
          selectedAgreements: {
            value: selectedAgreements
          }
        })
        if(isAlreadyInSelectOptions) {
          this.setState({
            addAgreementInput: null,
          })
        }
      }

    }
  }

  render() {
    const { form, fieldId, label, formItemLayout } = this.props
    const { getFieldDecorator } = form
    const { addAgreementInput, agreementTypes, selectedAgreements } = this.state

    return(
      <FormItem
        label={label}
        style={{margin: 0}}
        {...formItemLayout}
      >
        {getFieldDecorator(fieldId, {
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
      </FormItem>
    )
  }
}
AgreementSelector.propTypes = {
  fieldId: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
}

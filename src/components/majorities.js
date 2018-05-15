import React, { Component, Fragment } from 'react'
import { Form, Input, InputNumber, Radio, Divider, Select, Row, Col, Button, Icon } from 'antd'
import { formItemLayout } from '../containers/addCompanyForms'
import styled from 'styled-components'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Option = Select.Option
const Search = Input.Search

const MajoritiesContainer = styled.div`
  padding: 20px !important;
  background-color: #f1f1f1;
  border-radius: 5px;
`

const MajorityContainer = styled.div`
  width: 80%;
  padding: 10px;
  border-radius: 5px;
  background-color: #e9e9e9;
  margin: auto;
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

function Majority(props) {
  const { form, removeMajorityType } = props
  const { getFieldDecorator, getFieldValue } = form
  console.log(removeMajorityType)
  const {
    isUsualMajority,
    agreementTypes,
    addAgreementInput,
    title,
    id,
    handleAddAgreementInput,
    addAgreementType
  } = props

  return (
    <MajorityContainer>
      <h3 style={{float: 'left'}}>{title}</h3>
      {!isNaN(id) && (<Icon style={{marginLeft: 10}} type="minus-circle-o" onClick={() => removeMajorityType(id)}/>)}
      <MyDivider orientation="left">Tipo de mayoría</MyDivider>
      <FormItem>
        {getFieldDecorator(`${id}_majorityType`, {
           rules: [{
             required: true, message: 'este campo es obligatorio.',
           }]
        })(
           <RadioGroup>
             {isUsualMajority && <RadioButton value="option1">Opción 1</RadioButton>}
             <RadioButton value="option2">Opción 2</RadioButton>
             <RadioButton value="option3">Opción 3</RadioButton>
           </RadioGroup>
         )}
      </FormItem>

      { getFieldValue(`${id}_majorityType`) === 'option1' && (
          <Fragment>
            <FormItem>
              <span>
                Se requiere el voto favorable de la mayoría simple de los votos correspondientes a las participaciones sociales en que se divida el capital social.
              </span>
            </FormItem>
          </Fragment>
      )}

      {getFieldValue(`${id}_majorityType`) === 'option2' && (
         <Fragment>
           <FormItem>
             <span>Se requiere el voto favorable de, al menos, el </span>
             {getFieldDecorator(`${id}_minimumRatioOfVotingShares`, {
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
         </Fragment>
      )}

      {getFieldValue(`${id}_majorityType`) === 'option3' && (
         <Row>
           <FormItem>
             <span>Se requiere el voto favorable de, al menos, el </span>
             {getFieldDecorator(`${id}_minimumRatioOfVotes`, {
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
           </FormItem>
           <FormItem>
             {getFieldDecorator(`${id}_minimumRatioOfShareCapital`, {
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
           </FormItem>
           <FormItem>
             {getFieldDecorator(`${id}_typeOfShareCapital`, {
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
         </Row>
      )}

      <MyDivider orientation="left">Mínimo de socios?</MyDivider>
      <FormItem>
        <span>¿Se requiere, además, el voto favorable de un número mínimo de socios? </span>
        {getFieldDecorator(`${id}_hasMinNumberOfAssociates`, {
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
      </FormItem>
      {(getFieldValue(`${id}_hasMinNumberOfAssociates`) === 'yes') && (
         <FormItem>
           <span>Además, se requiere el voto favorable de, al menos, </span>
           {getFieldDecorator(`${id}_minimumRatioOfAssociates`, {
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
           <span> de los socios </span>
           {getFieldDecorator(`${id}_typeOfAssociateRatio`, {
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
      <MyDivider orientation="left">Votos en blanco</MyDivider>
      <FormItem>
        <span>Los votos en blanco se computarán? </span>
        {getFieldDecorator(`${id}_takesBlankVotesIntoAccount`, {
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
      {!isUsualMajority && (
         <Row>
           <FormItem style={{margin: 0}}>
             <span>Selecciona tipos de acuerdos: </span>
             {getFieldDecorator(`${id}_selectedReinforcedAgreementTypes`, {
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
               onChange={handleAddAgreementInput}
               onSearch={addAgreementType}
               value={addAgreementInput}
               enterButton="Añadir Tipo de Acuerdo"
             />
           </FormItem>
         </Row>
      )}
    </MajorityContainer>
  )
}


class DefineAgreementRules extends Component {
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
    ],
    id: 0,
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

  addMajorityType = () => {
    const { form } = this.props
    const { id } = this.state
    const majorityTypes = form.getFieldValue(`majorityTypes`);
    const nextMajorityTypes = majorityTypes.concat(id);
    this.setState({ id: id+1 })
    const fieldsValue = {}
    fieldsValue[`majorityTypes`] = nextMajorityTypes
    form.setFieldsValue(fieldsValue)
  }

  removeMajorityType = (id) => {
    const { form } = this.props
    const { fieldId } = this.state
    const majorityTypes = form.getFieldValue(`majorityTypes`);
    const nextMajorityTypes = {}
    nextMajorityTypes[`majorityTypes`] = majorityTypes.filter(key => key !== id)

    form.setFieldsValue(nextMajorityTypes);
  }

  addShareIntervalField = () => {
    const { form } = this.props
    const { uuid, fieldId } = this.state
    const shareIntervalKeys = form.getFieldValue(`${fieldId}Keys`);
    const nextShareIntervalKeys = shareIntervalKeys.concat(uuid);
    this.setState({ uuid: uuid+1 })
    const fieldsValue = {}
    fieldsValue[`${fieldId}Keys`] = nextShareIntervalKeys
    form.setFieldsValue(fieldsValue)
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form;
    const { agreementTypes, addAgreementInput } = this.state

    getFieldDecorator(`majorityTypes`, { initialValue: [] })
    const majorityTypeKeys = getFieldValue(`majorityTypes`)
    const additionalMajorities = majorityTypeKeys.map((id) => {
      return (
        <Fragment key={id}>
          <Majority
            id={id}
            title={`${id+1}. Mayoría`}
            form={form}
            isUsualMajority={false}
            agreementTypes={agreementTypes}
            addAgreementType={this.addAgreementType}
            handleAddAgreementInput={this.handleAddAgreementInput}
            addAgreementInput={addAgreementInput}
            removeMajorityType={this.removeMajorityType}
          />
          <Divider />
        </Fragment>
      )
    })

    return (
      <MajoritiesContainer>
        <Majority
          id="usual"
          title="Mayoría ordinaria"
          form={form}
          isUsualMajority={true}
          agreementTypes={agreementTypes}
          addAgreementType={this.addAgreementType}
          handleAddAgreementInput={this.handleAddAgreementInput}
          addAgreementInput={addAgreementInput}
        />

        <Divider />

        <Majority
          id="reinforced"
          title="Mayoría Reforzada"
          form={form}
          isUsualMajority={false}
          agreementTypes={agreementTypes}
          addAgreementType={this.addAgreementType}
          handleAddAgreementInput={this.handleAddAgreementInput}
          addAgreementInput={addAgreementInput}
        />

        <Divider />

        {additionalMajorities}

        <FormItem style={{margin: 0, width: '100%'}}>
          <Button type="dashed" onClick={this.addMajorityType} style={{width: '100%'}}>
            <Icon type="plus" /> Añadir tipo de majoria
          </Button>
        </FormItem>
      </MajoritiesContainer>
    )
  }
}

export default DefineAgreementRules


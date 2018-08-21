import React, { Component, Fragment } from 'react'
import { Form, InputNumber, Radio, Divider, Row, Button, Icon } from 'antd'
import AgreementSelector from './agreementSelector.js'
import styled from 'styled-components'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

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

class Majority extends Component {
  render() {
    const {
      form,
      removeMajorityType,
      isUsualMajority,
      title,
      id,
    } = this.props
    const { getFieldDecorator, getFieldValue } = form

    return (
      <MajorityContainer>
        <h3 style={{float: 'left'}}>{title}</h3>
        {!isNaN(id) && (<Icon style={{marginLeft: 10}} type="minus-circle-o" onClick={() => removeMajorityType(id)}/>)}
        <MyDivider orientation="left">Tipo de mayoría</MyDivider>
        <FormItem>
          {getFieldDecorator(`${id}_majorityOption`, {
             rules: [{
               required: true, message: 'este campo es obligatorio.',
             }]
          })(
             <RadioGroup>
               <RadioButton value={1}>Opción 1</RadioButton>
               <RadioButton value={2}>Opción 2</RadioButton>
             </RadioGroup>
           )}
        </FormItem>

        {getFieldValue(`${id}_majorityOption`) === 1 && (
           <Fragment>
             <FormItem>
               <span>Se requiere el voto favorable de, al menos, el </span>
               {getFieldDecorator(`${id}_electionThreshold`, {
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

        {getFieldValue(`${id}_majorityOption`) === 2 && (
           <Row>
             <FormItem>
               <span>Se requiere el voto favorable de, al menos, el </span>
               {getFieldDecorator(`${id}_electionThreshold`, {
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
               {getFieldDecorator(`${id}_minCapitalRatio`, {
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
               <span> del capital social total.</span>
             </FormItem>
             {/* <FormItem>
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
                 </FormItem> */}
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
             {getFieldDecorator(`${id}_minAssociateRatio`, {
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
             <span> de todo los socios.</span>
             {/* {getFieldDecorator(`${id}_typeOfAssociateRatio`, {
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
                 )} */}
           </FormItem>
        ) }
        <MyDivider orientation="left">Votos en blanco</MyDivider>
        <FormItem>
          <span>Los votos en blanco se computarán? </span>
          {getFieldDecorator(`${id}_countsBlankVotes`, {
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
             <AgreementSelector
               form={form}
               fieldId={`${id}_agreements`}
             />
           </Row>
        )}
      </MajorityContainer>
    )
  }
}


class DefineAgreementRules extends Component {
  state = {
    id: 0
  }

  componentDidMount() {
    const numberOfMajorityTypes = this.props.form.getFieldValue(`majorityTypes`).length
    if (numberOfMajorityTypes === 0) {
      this.addMajorityType()
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

    getFieldDecorator(`majorityTypes`, { initialValue: [] })
    const majorityTypeKeys = getFieldValue(`majorityTypes`)
    const additionalMajorities = majorityTypeKeys.map((id) => {
      return (
        <Fragment key={id}>
          <Majority
            id={id}
            title={id === 0 ? 'Mayoría reforzada' : `${id+1}. Mayoría`}
            form={form}
            isUsualMajority={false}
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


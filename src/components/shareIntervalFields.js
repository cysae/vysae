import React, { Component, Fragment } from 'react'
import { Form, Input, InputNumber, Button, Icon, Row, Col } from 'antd'
import { formItemLayout } from '../containers/addCompanyForms'
import styled from 'styled-components'
const InputGroup = Input.Group
const FormItem = Form.Item

const ShareIntervalsContainer = styled.div`
  width: 80%;
  padding: 10px;
  border-radius: 5px;
  background-color: #e9e9e9;
  margin: ${props => props.isValueField ? 'auto !important' : '0'};
`

class ShareIntervals extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uuid: 0,
      fieldId: 'shareInterval'
    }
    if(props.fieldId) {
      this.state.fieldId = props.fieldId
    }
  }

  componentDidMount() {
    const numberOfShareIntervals = this.props.form.getFieldValue(`${this.state.fieldId}Keys`).length
    if (numberOfShareIntervals === 0) {
      this.addShareIntervalField()
    }
  }

  removeShareIntervalField = (k) => {
    const { form } = this.props
    const { fieldId } = this.state
    const shareIntervalKeys = form.getFieldValue(`${fieldId}Keys`);
    if (shareIntervalKeys.length === 1) {
      return;
    }
    const nextShareIntervalKeys = {}
    nextShareIntervalKeys[`${fieldId}Keys`] = shareIntervalKeys.filter(key => key !== k)

    form.setFieldsValue(nextShareIntervalKeys);
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
    const { form, isValueField } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const { fieldId } = this.state

    getFieldDecorator(`${fieldId}Keys`, { initialValue: [] })
    const shareIntervalKeys = getFieldValue(`${fieldId}Keys`)
    const formItems = shareIntervalKeys.map((k, index) => {
      return (
        <Row key={index} type="flex">
          <Col>
            <FormItem>
              <span style={{marginRight: 10}}>{`${index+1}. Numeración: `}</span>
              {getFieldDecorator(`${fieldId}Start_${k}`, {
                 rules: [
                   {required: true, message: 'Este campo es obligatorio.'},
                   {pattern: /^\d*$/, message: 'Tiene que ser un número entero positivo'},
                 ],
              })(
                 <InputNumber min={1} />
               )}
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <span style={{margin: '0 10px 0 10px'}}>-</span>
              {getFieldDecorator(`${fieldId}End_${k}`, {
                 rules: [
                   {required: true, message: 'Este campo es obligatorio.'},
                   {pattern: /^\d*$/, message: 'Tiene que ser un número entero positivo'},
                 ],
              })(
                 <InputNumber min={1} />
               )}
              {shareIntervalKeys.length > 1 ? (
                 <Icon style={{marginLeft: 10}} type="minus-circle-o" disabled={shareIntervalKeys.length === 1} onClick={() => this.removeShareIntervalField(k)}/>
              ) : null}
            </FormItem>
          </Col>
          </Row>
      )
    })

    return (
      <ShareIntervalsContainer isValueField={isValueField}>
        {formItems}
        <FormItem style={{margin: 0}}>
          <Button type="dashed" onClick={this.addShareIntervalField} style={{width: '100%'}}>
            <Icon type="plus" /> Añadir Intervalo de participaciones
          </Button>
        </FormItem>
      </ShareIntervalsContainer>
    )
  }
}

export default ShareIntervals

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
      id: 0,
      fieldId: 'shareInterval'
    }
    if(props.fieldId) {
      this.state.fieldId = props.fieldId
    }
    props.form.getFieldDecorator(`${this.state.fieldId}_ids`, { initialValue: [] })
  }

  componentDidMount() {
    const numberOfShareIntervals = this.props.form.getFieldValue(`${this.state.fieldId}_ids`).length
    if (numberOfShareIntervals === 0) {
      this.addShareIntervalField()
    }
  }

  removeShareIntervalField = (k) => {
    const { form } = this.props
    const { fieldId } = this.state
    const shareIntervalIds = form.getFieldValue(`${fieldId}_ids`);
    if (shareIntervalIds.length === 1) {
      return;
    }
    const nextShareIntervalIds = {}
    nextShareIntervalIds[`${fieldId}_ids`] = shareIntervalIds.filter(key => key !== k)

    form.setFieldsValue(nextShareIntervalIds);
  }

  addShareIntervalField = () => {
    const { form } = this.props
    const { id, fieldId } = this.state
    const shareIntervalIds = form.getFieldValue(`${fieldId}_ids`);
    const nextShareIntervalIds = shareIntervalIds.concat(id);
    this.setState({ id: id+1 })
    const fieldsValue = {}
    fieldsValue[`${fieldId}_ids`] = nextShareIntervalIds
    form.setFieldsValue(fieldsValue)
  }

  render() {
    const { form, isValueField } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const { fieldId } = this.state

    const shareIntervalIds = getFieldValue(`${fieldId}_ids`)
    const formItems = shareIntervalIds.map((id) => {
      return (
        <Row key={id} type="flex">
          <Col>
            <FormItem>
              <span style={{marginRight: 10}}>{`${id+1}. Numeración: `}</span>
              {getFieldDecorator(`${fieldId}_begin_${id}`, {
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
              {getFieldDecorator(`${fieldId}_end_${id}`, {
                 rules: [
                   {required: true, message: 'Este campo es obligatorio.'},
                   {pattern: /^\d*$/, message: 'Tiene que ser un número entero positivo'},
                 ],
              })(
                 <InputNumber min={1} />
               )}
              <span style={{marginLeft: 10}}> ambas inclusive.</span>
              {shareIntervalIds.length > 1 ? (
                 <Icon
                   style={{marginLeft: 10}}
                   type="minus-circle-o"
                   disabled={shareIntervalIds.length === 1}
                   onClick={() => this.removeShareIntervalField(id)}/>
              ) : null}
            </FormItem>
          </Col>
          </Row>
      )
    })

    return (
      <ShareIntervalsContainer style={{...this.props.style}}isValueField={isValueField}>
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

import React, { Component } from 'react'
import { Form, InputNumber, Button, Icon, Row, Col } from 'antd'
import styled from 'styled-components'
const FormItem = Form.Item

const ShareIntervalsContainer = styled.div`
  /* width: 80%; */
  padding: 10px;
  border-radius: 5px;
  background-color: #e9e9e9;
  margin: ${props => props.isValueField ? 'auto !important' : '0'};
`

class ShareIntervals extends Component {
  constructor(props) {
    super(props)

    const {
      fieldId,
      form: { getFieldDecorator },
      intvls
    } = props

    this.state = {
      id: (intvls) ? intvls.length : 1,
      fieldId: (fieldId) ? fieldId : 'shareInterval',
    }

    getFieldDecorator(`${this.state.fieldId}_ids`, {
      initialValue: (intvls) ? intvls.map((intvl, index) => index ) : [0]
    })
  }

  componentDidMount() {
    const {
      form: { setFieldsValue, getFieldValue },
      intvls
    } = this.props
    const { fieldId } = this.state

    // if intvls set load data into form
    if(intvls) {
      for( const id of getFieldValue(`${fieldId}_ids`) ) {
        setFieldsValue({
          [`${fieldId}_start_${id}`]: intvls[id].start,
          [`${fieldId}_end_${id}`]: intvls[id].end,
        })
      }
    }
  }

  removeShareIntervalField = (k) => {
    const { form: { getFieldValue, setFieldsValue }} = this.props
    const { fieldId } = this.state
    const shareIntervalIds = getFieldValue(`${fieldId}_ids`);
    if (shareIntervalIds.length === 1) {
      return;
    }
    const nextShareIntervalIds = {}
    nextShareIntervalIds[`${fieldId}_ids`] = shareIntervalIds.filter(key => key !== k)

    setFieldsValue(nextShareIntervalIds);
  }

  addShareIntervalField = () => {
    const { form: { getFieldValue, setFieldsValue }} = this.props
    const { id, fieldId } = this.state
    this.setState({ id: id+1 })
    setFieldsValue({[`${fieldId}_ids`]: getFieldValue(`${fieldId}_ids`).concat(id)})
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
              {getFieldDecorator(`${fieldId}_start_${id}`, {
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

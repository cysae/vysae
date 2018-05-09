import React, { Component, Fragment } from 'react'
import { Form, Input, InputNumber, Button, Icon, Row, Col } from 'antd'
import { formItemLayout } from '../containers/addCompanyForms'
const InputGroup = Input.Group
const FormItem = Form.Item

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
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { fieldId } = this.state

    getFieldDecorator(`${fieldId}Keys`, { initialValue: [] })
    const shareIntervalKeys = getFieldValue(`${fieldId}Keys`)
    const formItems = shareIntervalKeys.map((k, index) => {
      return (
        <FormItem key={index}>
          <InputGroup compact>
            <Input style={{ width: 130, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder={`${index+1}. Numeración`} disabled />
            {getFieldDecorator(`${fieldId}Start_${k}`, {
              rules: [
                {required: true, message: 'Este campo es obligatorio.'},
                {pattern: /^\d*$/, message: 'Tiene que ser un número entero positivo'},
              ],
            })(
               <InputNumber min={1} />
             )}
            <Input style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="-" disabled />
            {getFieldDecorator(`${fieldId}End_${k}`, {
              rules: [
                {required: true, message: 'Este campo es obligatorio.'},
                {pattern: /^\d*$/, message: 'Tiene que ser un número entero positivo'},
              ],
            })(
               <InputNumber min={1} />
             )}
        {shareIntervalKeys.length > 1 ? (
            <Input
              style={{ width: 40, backgroundColor: '#fff' }}
              suffix={<Icon type="minus-circle-o" disabled={shareIntervalKeys.length === 1} onClick={() => this.removeShareIntervalField(k)}/>}
              disabled
            />
        ) : null}
          </InputGroup>
        </FormItem>
      )
    })

    return (
      <Fragment>
        {formItems}
        <FormItem>
          <Button type="dashed" onClick={this.addShareIntervalField} style={{ width: '80%' }}>
            <Icon type="plus" /> Añadir Intervalo de participaciones
          </Button>
        </FormItem>
      </Fragment>
    )
  }
}

export default ShareIntervals

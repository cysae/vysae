import React, { Component, Fragment } from 'react'
import { Form, Input, InputNumber, Button, Icon, Row, Col, Radio } from 'antd'
import { HOCForm, formItemLayout } from '../containers/addCompanyForms'
const FormItem = Form.Item

class RawShareIntervals extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uuid: 0,
      fieldId: 'shareInterval'
    }
    if(props.fieldId) {
      this.state.fieldId = props.fieldId
    }
    this.addShareIntervalField
  }

  removeShareIntervalField = (k) => {
    const { form } = this.props
    const { fieldId } = this.state
    const shareIntervalKeys = form.getFieldValue(`${fieldId}Keys`);
    if (shareIntervalKeys.length === 1) {
      return;
    }

    form.setFieldsValue({
      shareIntervalKeys: shareIntervalKeys.filter(key => key !== k),
    });
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
        <FormItem
          label={`Numeración ${index+1}`}
          labelCol={{span: 8}}
          key={`${fieldId}_index`}
        >
          <span>de la </span>
          {getFieldDecorator(`${fieldId}Start_${k}`, {
             rules: [{
               required: true,
               message: "Este campo es obligatorio.",
             }, {
               type: 'number',
               message: "Tiene que ser un numero.",
             }],
          })(
             <InputNumber />
           )}
          <span> a la </span>
          {getFieldDecorator(`${fieldId}End_${k}`, {
             rules: [{
               required: true,
               message: "Este campo es obligatorio.",
             }, {
               type: 'number',
               message: "Tiene que ser un numero.",
             }],
          })(
             <InputNumber />
           )}
          <span> ambas inclusive</span>
          {shareIntervalKeys.length > 1 ? (
             <Icon
               className="dynamic-delete-button"
               type="minus-circle-o"
               disabled={shareIntervalKeys.length === 1}
               onClick={() => this.removeShareIntervalField(k)}
             />
          ) : null}
        </FormItem>
      )
    })

    return (
      <Fragment>
        <FormItem
          label="Numeración de participaciones"
          {...formItemLayout}
        >
          <Button type="dashed" onClick={this.addShareIntervalField} style={{ width: '60%' }}>
            <Icon type="plus" /> Añadir Intervalo de participaciones
          </Button>
        </FormItem>
        {formItems}
      </Fragment>
    )
  }
}

export default HOCForm(RawShareIntervals)

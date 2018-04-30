import React, { Component, Fragment } from 'react'
import { Form, Input, InputNumber, Button, Icon, Row, Col, Radio } from 'antd'
import { HOCForm, formItemLayout } from '../containers/addCompanyForms'
const FormItem = Form.Item

class RawShareIntervals extends Component {
  constructor(props) {
    super(props)

    this.state = { uuid: 0 }
    this.addShareIntervalField
  }

  removeShareIntervalField = (k) => {
    const { form } = this.props;
    const shareIntervalKeys = form.getFieldValue('shareIntervalKeys');
    if (shareIntervalKeys.length === 1) {
      return;
    }

    form.setFieldsValue({
      shareIntervalKeys: shareIntervalKeys.filter(key => key !== k),
    });
  }
  addShareIntervalField = () => {
    const { form } = this.props;
    const shareIntervalKeys = form.getFieldValue('shareIntervalKeys');
    const nextShareIntervalKeys = shareIntervalKeys.concat(this.state.uuid);
    this.state.uuid++;
    form.setFieldsValue({
      shareIntervalKeys: nextShareIntervalKeys,
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('shareIntervalKeys', { initialValue: [] })
    const shareIntervalKeys = getFieldValue('shareIntervalKeys')
    const formItems = shareIntervalKeys.map((k, index) => {
      return (
        <FormItem
          label={`Numeración ${index+1}`}
          labelCol={{span: 8}}
        >
          <span>de la </span>
          {getFieldDecorator(`shareIntervalStart_${k}`, {
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
          {getFieldDecorator(`shareIntervalEnd_${k}`, {
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

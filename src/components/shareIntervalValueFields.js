import React, { Component, Fragment } from 'react'
import { Form, Input, InputNumber, Button, Icon, Row, Col, Divider } from 'antd'
import ShareIntervalFields from './shareIntervalFields'
import { HOCForm, formItemLayout } from '../containers/addCompanyForms'
const FormItem = Form.Item

class RawShareIntervalValueFields extends Component {
  constructor(props) {
    super(props)

    this.state = { uuid: 0 }
    this.addShareIntervalValueField
  }

  removeShareIntervalValueField = (k) => {
    const { form } = this.props;
    const shareIntervalValueKeys = form.getFieldValue('shareIntervalValueKeys');
    if (shareIntervalValueKeys.length === 1) {
      return;
    }

    form.setFieldsValue({
      shareIntervalValueKeys: shareIntervalValueKeys.filter(key => key !== k),
    });
  }

  addShareIntervalValueField = () => {
    const { form } = this.props;
    const { uuid } = this.state;
    const shareIntervalValueKeys = form.getFieldValue('shareIntervalValueKeys');
    const nextShareIntervalValueKeys = shareIntervalValueKeys.concat(uuid);
    this.setState({ uuid: uuid+1 })
    form.setFieldsValue({
      shareIntervalValueKeys: nextShareIntervalValueKeys,
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('shareIntervalValueKeys', { initialValue: [] })
    const shareIntervalValueKeys = getFieldValue('shareIntervalValueKeys')
    const formItems = shareIntervalValueKeys.map((k, index) => {

      return (
        <Fragment>
          <FormItem
            label={`Tipo ${index+1}`}
            labelCol={{span: 8}}
            key={index}
          >
            <span>Valor nominal de cada participación </span>
            {getFieldDecorator(`shareIntervalValue_${k}`, {
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
            {shareIntervalValueKeys.length > 1 ? (
               <Icon
                 className="dynamic-delete-button"
                 type="minus-circle-o"
                 disabled={shareIntervalValueKeys.length === 1}
                 onClick={() => this.removeShareIntervalValueField(k)}
               />
            ) : null}
          </FormItem>
          <ShareIntervalFields fieldId={`shareIntervalValue_${index}`} />
          <Divider dashed />
        </Fragment>
      )
    })

    return (
      <Fragment>
        <FormItem
          label="Numeración de participaciones"
          {...formItemLayout}
        >
          <Button type="dashed" onClick={this.addShareIntervalValueField} style={{ width: '60%' }}>
            <Icon type="plus" /> Añadir tipo de participación
          </Button>
        </FormItem>
        {formItems}
      </Fragment>
    )
  }
}

export default HOCForm(RawShareIntervalValueFields)


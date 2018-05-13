import React, { Component, Fragment } from 'react'
import { Form, InputNumber, Button, Icon, Divider, Row, Col } from 'antd'
import ShareIntervalFields from './shareIntervalFields'
import { MyInputNumber, formItemLayout } from '../containers/addCompanyForms'
const FormItem = Form.Item

class ShareIntervalValueFields extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uuid: 0,
      fieldId: 'shareIntervalType',
      shareTypeField: <MyInputNumber min={1} formatter={value => `${value}€`} parser={value => value.replace('€', '')} />,
      shareTypeLabel: 'Valor nominal de cada participación',
      shareTypeRootId: 'shareIntervalValue'
    }
    if(props.fieldId) {
      this.state.fieldId = props.fieldId
    }
    if(props.shareTypeLabel) {
      this.state.shareTypeLabel = props.shareTypeLabel
    }
    if(props.shareTypeRootId) {
      this.state.shareTypeRootId = props.shareTypeRootId
    }
    if(props.shareTypeField) {
      this.state.shareTypeField = props.shareTypeField
    }
  }

  componentDidMount() {
    const numberOfShareIntervalValueFields = this.props.form.getFieldValue(`${this.state.fieldId}Keys`).length
    if(numberOfShareIntervalValueFields === 0) {
      this.addShareIntervalValueField()
    }
  }

  removeShareIntervalValueField = (k) => {
    const { form } = this.props
    const { fieldId } = this.state
    const shareIntervalValueKeys = form.getFieldValue(`${fieldId}Keys`);
    if (shareIntervalValueKeys.length === 1) {
      return;
    }

    const nextShareIntervalValueKeys = {}
    nextShareIntervalValueKeys[`${fieldId}Keys`] = shareIntervalValueKeys.filter(key => key !== k)

    form.setFieldsValue(nextShareIntervalValueKeys);
  }

  addShareIntervalValueField = () => {
    const { form } = this.props;
    const { uuid, fieldId  } = this.state;
    const shareIntervalValueKeys = form.getFieldValue(`${fieldId}Keys`);
    const nextShareIntervalValueKeys = shareIntervalValueKeys.concat(uuid);
    this.setState({ uuid: uuid+1 })
    const fieldsValue = {}
    fieldsValue[`${fieldId}Keys`] = nextShareIntervalValueKeys
    form.setFieldsValue(fieldsValue)
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fieldId, shareTypeLabel, shareTypeRootId, shareTypeField } = this.state

    getFieldDecorator(`${fieldId}Keys`, { initialValue: [] })
    const shareIntervalValueKeys = getFieldValue(`${fieldId}Keys`)
    const formItems = shareIntervalValueKeys.map((k, index) => {

      return (
        <Fragment key={index}>
        <h4>{`Tipo ${index+1}`}</h4>
        <FormItem
        label={shareTypeLabel}
        labelCol={{span: 10}}
        >
        {getFieldDecorator(`${shareTypeRootId}_${index}`, {
          rules: [{
                 required: true,
                 message: "Este campo es obligatorio.",
               }, {
                 type: 'number',
                 message: "Tiene que ser un numero.",
               }],
            })(
              shareTypeField
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
          <ShareIntervalFields form={this.props.form} fieldId={`shareIntervalValueField_${index}`} />
          <Divider dashed />
        </Fragment>
      )
    })

    return (
      <Fragment>
        <Row >
          <Col offset={12}>
          {formItems}
          </Col>
        </Row>
        <Row>
          <Col offset={12}>
          <Button type="dashed" onClick={this.addShareIntervalValueField} style={{ width: '80%' }}>
            <Icon type="plus" /> Añadir tipo de participación
          </Button>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default ShareIntervalValueFields


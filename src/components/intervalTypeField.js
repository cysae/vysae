import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, InputNumber, Button, Icon, Divider, Row, Col } from 'antd'
import ShareIntervalFields from './shareIntervalFields'
import { MyInputNumber, formItemLayout } from '../containers/addCompanyForms'
import styled from 'styled-components'
const FormItem = Form.Item

const ContainerCol = styled(Col)`
  padding: 10px !important;
  background-color: #f1f1f1;
  border-radius: 5px;
`

class IntervalTypeField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      fieldId: 'shareValue_type',
      shareTypeField: <MyInputNumber min={0} formatter={value => `${value}€`} parser={value => value.replace('€', '')} />,
      shareTypeLabel: 'Valor nominal de cada participación',
    }
    if(props.fieldId) {
      this.state.fieldId = props.fieldId
    }
    if(props.shareTypeLabel) {
      this.state.shareTypeLabel = props.shareTypeLabel
    }
    if(props.shareTypeField) {
      this.state.shareTypeField = props.shareTypeField
    }

    props.form.getFieldDecorator(`${this.state.fieldId}_type_ids`, { initialValue: [] })
  }

  componentDidMount() {
    const numberOfShareIntervalValueFields = this.props.form.getFieldValue(`${this.state.fieldId}_type_ids`).length
    if(numberOfShareIntervalValueFields === 0) {
      this.addShareIntervalValueField()
    }
  }

  removeShareIntervalValueField = (id) => {
    const { form } = this.props
    const { fieldId } = this.state
    const shareIntervalValueIds = form.getFieldValue(`${fieldId}_type_ids`);
    if (shareIntervalValueIds.length === 1) {
      return;
    }

    const nextShareIntervalValueIds = {}
    nextShareIntervalValueIds[`${fieldId}_ids`] = shareIntervalValueIds.filter(key => key !== id)

    form.setFieldsValue(nextShareIntervalValueIds);
  }

  addShareIntervalValueField = () => {
    const { form } = this.props;
    const { id, fieldId  } = this.state;
    const shareIntervalValueIds = form.getFieldValue(`${fieldId}_type_ids`);
    const nextShareIntervalValueIds = shareIntervalValueIds.concat(id);
    this.setState({ id: id+1 })
    const fieldsValue = {}
    fieldsValue[`${fieldId}_type_ids`] = nextShareIntervalValueIds
    form.setFieldsValue(fieldsValue)
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fieldId, shareTypeLabel, shareTypeField } = this.state

    const shareIntervalValueIds = getFieldValue(`${fieldId}_type_ids`)
    const formItems = shareIntervalValueIds.map((id) => {

      return (
        <Fragment key={id}>
          <h4>{`Tipo ${id+1}`}</h4>
          <FormItem
            label={shareTypeLabel}
            labelCol={{span: 12}}
          >
            {getFieldDecorator(`${fieldId}_${id}`, {
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
            {shareIntervalValueIds.length > 1 ? (
               <Icon
                 className="dynamic-delete-button"
                 type="minus-circle-o"
                 disabled={shareIntervalValueIds.length === 1}
                 onClick={() => this.removeShareIntervalValueField(id)}
               />
            ) : null}
          </FormItem>
          <ShareIntervalFields
            isValueField={true}
            form={this.props.form}
            fieldId={`shareValue_type_${id}`} />
          <Divider dashed />
        </Fragment>
      )
    })

    return (
      <Row>
        <ContainerCol span={12} offset={12}>
          {formItems}
          <Button type="dashed" onClick={this.addShareIntervalValueField} style={{ width: '100%' }}>
            <Icon type="plus" /> Añadir tipo de participación
          </Button>
        </ContainerCol>
      </Row>
    )
  }
}

IntervalTypeField.prototype = {
  form: PropTypes.object.isRequired,
  fieldId: PropTypes.object.isRequired,
}

export default IntervalTypeField


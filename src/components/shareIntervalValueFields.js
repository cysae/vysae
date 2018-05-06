import React, { Component, Fragment } from 'react'
import { Form, InputNumber, Button, Icon, Divider, Row, Col } from 'antd'
import ShareIntervalFields from './shareIntervalFields'
import { EURInput, formItemLayout } from '../containers/addCompanyForms'
const FormItem = Form.Item

class ShareIntervalValueFields extends Component {
  constructor(props) {
    super(props)

    this.state = { uuid: 0 }
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
        <Fragment key={index}>
        <h4>{`Tipo ${index+1}`}</h4>
        <FormItem
        label="Valor nominal de cada participación"
        labelCol={{span: 10}}

        >
        {getFieldDecorator(`shareIntervalValue_${index}`, {
          rules: [{
                 required: true,
                 message: "Este campo es obligatorio.",
               }, {
                 type: 'number',
                 message: "Tiene que ser un numero.",
               }],
            })(
              <EURInput />
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

    // render only if shares have different value
    if(getFieldValue('sharesHaveSameValue') !== 'no') {
      return (null)
    }

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


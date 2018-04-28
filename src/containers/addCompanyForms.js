import React, { Component, Fragment } from 'react'
import { Form, Input, InputNumber, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import { saveCompanyForm } from '../actions/index'

const FormItem = Form.Item

function HOCForm(formComponent) {
  return connect((state) => {
    return {
      formState: {
        ...state.companyForm
      }
    }
  })(Form.create({
    onFieldsChange(props, changedFields) {
      props.dispatch(saveCompanyForm(changedFields))
    },
    mapPropsToFields(props) {
      return {
        name: Form.createFormField(props.formState.name),
        registeredOffice: Form.createFormField(props.formState.registeredOffice),
        nif: Form.createFormField(props.formState.nif),
        socialCapital: Form.createFormField(props.formState.socialCapital),
        numberOfShares: Form.createFormField(props.formState.numberOfShares),
        shareIntervals: Form.createFormField(props.formState.shareIntervals),
      }
    },
    onValuesChange(_, values) {
      console.log(values);
    },
  })(formComponent))

}

class RawBasicForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.next()
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Denominación social">
            {getFieldDecorator('name', {
               rules: [{ required: true, message: 'Es obligatorio.' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="Domicilio Social">
            {getFieldDecorator('registeredOffice', {
               rules: [{ required: true, message: 'Es obligatorio.' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="NIF">
            {getFieldDecorator('nif', {
               rules: [{ required: true, message: 'Es obligatorio.' }],
            })(<Input />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Continuar
            </Button>
          </FormItem>
        </Form>
      </Fragment>
    );
  }
}

let uuid = 0;
class RawSharesForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.next()
      }
    });
  }

  removeShareIntervalField = (k) => {
    const { form } = this.props;
    const shareIntervals = form.getFieldValue('shareIntervals');
    if (shareIntervals.length === 1) {
      return;
    }

    form.setFieldsValue({
      shareIntervals: shareIntervals.filter(shareInterval => shareInterval !== k),
    });
  }
  addShareIntervalField = () => {
    const { form } = this.props;
    const shareIntervals = form.getFieldValue('shareIntervals');
    const nextShareIntervals = shareIntervals.concat(uuid);
    uuid++;
    form.setFieldsValue({
      shareIntervals: nextShareIntervals,
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('shareIntervals', { initialValue: [] })
    const shareIntervals = getFieldValue('shareIntervals')
    const formItems = shareIntervals.map((k, index) => {
      return (
        <FormItem
        label={index === 0 ? 'Intervalos de Participaciones' : ''}
        required={false}
        key={k}
        >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input passenger's name or delete this field.",
          }],
        })(
          <Input style={{ width: '60%', marginRight: 8 }} />
        )}
        {shareIntervals.length > 1 ? (
          <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          disabled={shareIntervals.length === 1}
          onClick={() => this.removeShareIntervalField(k)}
          />
        ) : null}
        </FormItem>
      )
    })

    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Capital social">
            {getFieldDecorator('socialCapital', {
              rules: [
                {type: "number", message: 'Tiene que ser un numero.'},
                {required: true, message: 'Es obligatorio.' }
              ],
            })(<InputNumber />)}
          </FormItem>
          <FormItem label="Número de participaciones">
            {getFieldDecorator('numberOfShares', {
               rules: [{ type: "number", required: true, message: 'Es obligatorio y tiene que ser un numero.' }],
            })(<InputNumber />)}
          </FormItem>
          {formItems}
          <FormItem>
            <Button type="dashed" onClick={this.addShareIntervalField} style={{ width: '60%' }}>
              <Icon type="plus" /> Añadir Intervalo de Participaciones
            </Button>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Continuar
            </Button>
          </FormItem>
        </Form>
        <pre>
          {JSON.stringify(this.props.formState, null, 2)}
        </pre>
      </Fragment>
    );
  }
}

export const BasicForm = HOCForm(RawBasicForm)
export const SharesForm = HOCForm(RawSharesForm)

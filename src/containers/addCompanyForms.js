import React, { Component, Fragment } from 'react'
import { Form, Input, InputNumber, Button, Icon, Row, Col, Radio } from 'antd'
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
      const fields = {};
      for (const key in props.formState) {
        fields[key] = Form.createFormField(props.formState[key])
      }
      return fields;
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
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  addShareIntervalField = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('keys', { initialValue: [] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => {
      return (
        <Row key={k}>
        <Col span={12}>
        <FormItem
        label={'Numeración: de la'}
        labelCol={{span: 8}}
        >
        {getFieldDecorator(`shareIntervalStart_${k}`, {
          validateTrigger: ['onChange', 'onBlur'],
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
        </FormItem>
        </Col>
        <Col span={12}>
        <FormItem
        labelCol={{span: 8}}
        label={'a la'}
        >
        {getFieldDecorator(`shareIntervalEnd_${k}`, {
          validateTrigger: ['onChange', 'onBlur'],
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
        {keys.length > 1 ? (
          <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          disabled={keys.length === 1}
          onClick={() => this.removeShareIntervalField(k)}
          />
        ) : null}
        </FormItem>
        </Col>
        </Row>
      )
    })

    return (
      <Fragment>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
      <FormItem
      label="Capital social"
      labelCol={{span: 3}}
      >
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

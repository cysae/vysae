import React, { Component, Fragment } from 'react'
import { Form, Input, InputNumber, Button, Icon, Row, Col, Radio, Divider } from 'antd'
import { connect } from 'react-redux'
import { saveCompanyForm } from '../actions/index'
import ShareIntervalFields from '../components/shareIntervalFields'
import ShareIntervalValueFields from '../components/shareIntervalValueFields'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const FormItem = Form.Item

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export function HOCForm(formComponent) {
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


class RawSharesForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.next()
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;


    return (
      <Fragment>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <FormItem
            label="Capital social"
            {...formItemLayout}
          >
            {getFieldDecorator('socialCapital', {
               rules: [
                 {type: "number", message: 'Tiene que ser un numero.'},
                 {required: true, message: 'Es obligatorio.' }
               ],
            })(<InputNumber />)}
          </FormItem>
          <FormItem
            label="Número de participaciones"
            {...formItemLayout}
          >
            {getFieldDecorator('numberOfShares', {
               rules: [{ type: "number", required: true, message: 'Es obligatorio y tiene que ser un numero.' }],
            })(<InputNumber />)}
          </FormItem>
          <ShareIntervalFields />
          <Divider />

          <FormItem
            label="¿Tienen todas las participaciones el mismo valor nominal?"
            {...formItemLayout}
          >
            {getFieldDecorator('sharesSameValue', {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <RadioGroup>
                 <RadioButton value="yes">Sí</RadioButton>
                 <RadioButton value="no">No</RadioButton>
               </RadioGroup>
             )}
          </FormItem>
          <ShareIntervalValueFields />
          <Divider />

          <FormItem label="¿Todas las participaciones tienen el mismo derecho de voto?">
            {getFieldDecorator('sharesSameVote', {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <RadioGroup>
                 <RadioButton value="yes">Sí</RadioButton>
                 <RadioButton value="no">No</RadioButton>
               </RadioGroup>
             )}
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.props.prev}>
              Atrás
            </Button>
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

import React, { Component } from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item

const BasicInfo = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    console.log(props);
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value,
      }),
    }
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline">
      <FormItem label="Username">
        {getFieldDecorator('username', {
           rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
    </Form>
  );
})

class Demo extends Component {
  state = {
    fields: {
      username: {
        value: 'dirk'
      }
    }
  };

  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }))
  }

  render() {
    const fields = this.state.fields;
    return (
      <div>
        <BasicInfo {...fields} onChange={this.handleFormChange} />
        <pre className="lanugage-bash">
          {JSON.stringify(fields, null, 2)}
        </pre>
      </div>
    )
  }
}

export default Demo

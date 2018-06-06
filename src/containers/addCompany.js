import React, { Fragment } from 'react'
import { Steps, Divider } from 'antd'
import {
  SharesForm,
  AgreementRules,
  ShareHolderRegistry,
  GoverningBodies
} from '../containers/addCompanyForms.js'
import BasicForm from '../containers/basicForm.js'
import { connect } from 'react-redux'
import { Form } from 'antd'
import { saveCompanyForm } from '../actions/index'
const Step = Steps.Step

class AddCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };

    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { form } = this.props
    const { current } = this.state

    const steps = [{
      title: 'Información',
      content: <BasicForm next={this.next} prev={this.prev} form={form}/>,
    }, {
      title: 'Participaciones',
      content: <SharesForm next={this.next} prev={this.prev} />,
    }, {
      title: 'Acuerdos',
      content: <AgreementRules next={this.next} prev={this.prev} />,
    }, {
      title: 'Socios',
      content: <ShareHolderRegistry next={this.next} prev={this.prev} />,
    }, {
      title: 'Gobierno',
      content: <GoverningBodies next={this.next} prev={this.prev} />,
    }];

    return (
      <Fragment>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <Divider />
        <div className="steps-content">{steps[current].content}</div>
        <pre>
          {JSON.stringify(this.props.formState, null, 2)}
        </pre>
      </Fragment>
    )
  }
}

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
      /* console.log(values); */
    },
  })(formComponent))
}

export default HOCForm(AddCompany);

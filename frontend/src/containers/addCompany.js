import React, { Fragment } from 'react'
import { Steps, Divider } from 'antd'
import AgreementRules from '../containers/agreementRulesForm.js'
import ShareholderRegistry from '../containers/shareholderRegistry.js'
import GoverningBodies from '../containers/governingBodiesForm.js'
import { connect } from 'react-redux'
import { Form } from 'antd'
import { saveCompanyForm } from '../actions/index'
const Step = Steps.Step

class AddCompany extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
    }

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
      title: 'Acuerdos',
      content: <AgreementRules next={this.next} prev={this.prev} form={form} />,
    }, {
      title: 'Socios',
      content: <ShareholderRegistry next={this.next} prev={this.prev} form={form} />,
    }, {
      title: 'Gobierno',
      content: <GoverningBodies next={this.next} prev={this.prev} form={form} />,
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

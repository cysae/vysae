import React, { Fragment } from 'react'
import { Steps } from 'antd'
import {
  BasicForm,
  SharesForm,
  AgreementRules,
  ShareHolderRegistry
} from '../containers/addCompanyForms.js'
const Step = Steps.Step

class AddCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 3,
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
    const { current } = this.state;

    const steps = [{
      title: 'Información',
      content: <BasicForm next={this.next} prev={this.prev} />,
    }, {
      title: 'Participaciones sociales',
      content: <SharesForm next={this.next} prev={this.prev} />,
    }, {
      title: 'Adopción de acuerdos',
      content: <AgreementRules next={this.next} prev={this.prev} />,
    }, {
      title: 'Libro de socios',
      content: <ShareHolderRegistry next={this.next} prev={this.prev} />,
    }, {
      title: 'Órganos de gobierno',
      content: 'Last-content',
    }];

    return (
      <Fragment>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
      </Fragment>
    )
  }
}

export default AddCompany;

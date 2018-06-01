import React, { Fragment } from 'react'
import { Steps, Divider } from 'antd'
import {
  BasicForm,
  SharesForm,
  AgreementRules,
  ShareHolderRegistry,
  GoverningBodies
} from '../containers/addCompanyForms.js'
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
    const { current } = this.state;

    const steps = [{
      title: 'Información',
      content: <BasicForm next={this.next} prev={this.prev} />,
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
      </Fragment>
    )
  }
}

export default AddCompany;

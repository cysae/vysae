import React, { Fragment } from 'react'
import { Steps, Button, message } from 'antd'
import BasicInfo from './basicInfo'
const Step = Steps.Step;

const steps = [{
  title: 'Información',
  content: <BasicInfo />,
}, {
  title: 'Participaciones sociales',
  content: 'Second-content',
}, {
  title: 'Adopción de acuerdos',
  content: 'Last-content',
}, {
  title: 'Órganos de gobierno',
  content: 'Last-content',
}, {
  title: 'Libro de socios',
  content: 'Last-content',
}];

class AddCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
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

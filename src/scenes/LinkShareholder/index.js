import React from 'react'
// antd
import { Steps, Button, message } from 'antd';
// components
import Register from './components/Register'
import Confirm from './components/Confirm'

const Step = Steps.Step;


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
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

    const steps = [{
      title: 'Registracion',
      content: <Register next={this.next} />,
    }, {
      title: 'Confirmar',
      content: <Confirm />,
    }];

    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
      </div>
    );
  }
}

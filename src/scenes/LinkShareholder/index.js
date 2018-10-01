import React from 'react'
// antd
import { Steps, Button, message } from 'antd';
// components
import Register from './components/Register'
import Confirm from './components/Confirm'

const Step = Steps.Step;


export default class App extends React.Component {
 state = {
   current: 0,
   user: null,
 }

  next = (user) => {
    const current = this.state.current + 1;
    this.setState({ current, user });
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  toCompanyDashboard = () => {
    const {
      history,
      match: { params: { companyId }},
    } = this.props
    history.push(`/${companyId}/dashboard`)
  }

  render() {
    const { current, user } = this.state;
    const { match: { params: { companyId, shareholderId }}} = this.props
    console.log(this.props)

    const steps = [{
      title: 'Registracion',
      content: <Register next={this.next} />,
    }, {
      title: 'Confirmar',
      content: (
        <Confirm
          user={user}
          companyId={companyId}
          shareholderId={shareholderId}
          toCompanyDashboard={this.toCompanyDashboard}
        />
      )
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

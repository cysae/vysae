import React, { Component } from 'react'
// antd
import { Steps, Button, message, Select, Icon } from 'antd';
// services
import getCompany from '../../../../services/getCompany'
// components
import AgreementVotingList from './components/AgreementVotingList'

const Step = Steps.Step
const Option = Select.Option

const SelectShareholder = props => {
  const { shareholders, handleSelectShareholder } = props

  return (
    <Select defaultValue="Dirk" onChange={handleSelectShareholder}>
      {shareholders.map(
         shareholder => (
           <Option
             key={shareholder.shareholderId}
             value={shareholder.shareholderId}
             >
             {shareholder.name}
           </Option>
         )
      )}
    </Select>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    const { company: { myShareholders }} = props

    const shareholderId = (myShareholders.length !== 0) ? myShareholders[0].shareholderId : null

    this.state = {
      current: 0,
      shareholderId
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

  handleSelectShareholder = (value) => {
    this.setState({ shareholderId: value })
  }

  render() {
    const {
      company: { myShareholders },
      company: { companyId },
      match: { params: { meetingId }},
    } = this.props
    const { current, shareholderId } = this.state;

    if( shareholderId === null )
      return (
        <div>No tiene Socio dentro de la empresa</div>
      )

    const steps = [{
      title: '1. Seleccionar Socio',
      icon: <Icon type="user" />,
      content: (
        <SelectShareholder
          shareholders={myShareholders}
          handleSelectShareholder={this.handleSelectShareholder}
        />
      )
    }, {
      title: '2. Votar',
      icon: <Icon type="solution" />,
      content: (
        <AgreementVotingList
          shareholderId={shareholderId}
          companyId={companyId}
          meetingId={meetingId}
        />
      )
    }];

    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} icon={item.icon} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => message.success('Has votado!')}>Done</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
      </div>
    );
  }
}

export default getCompany(App)

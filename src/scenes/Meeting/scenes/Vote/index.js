import React, { Component } from 'react'
// antd
import { Steps, Button, message, Select, Icon } from 'antd';
// services
import getMeeting from '../../../../services/getMeeting'
import getUser from '../../../../services/getUser'
// router
import { Link } from 'react-router-dom'
// components
import AgreementVotingList from './components/AgreementVotingList'
import { compose } from 'recompose'

const Step = Steps.Step
const Option = Select.Option

const SelectShareholder = props => {
  const {
    shareholders,
    handleSelectShareholder,
  } = props

  return (
    <Select defaultValue={shareholders[0].name} onChange={handleSelectShareholder}>
      {shareholders.map(
         shareholder => (
           <Option
             key={shareholder.id}
             value={shareholder.id}
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
    const {
      user: { shareholders },
      match: { params: { companyId}},
    } = props

    const myShareholders = shareholders.items.filter((shareholder) => {
      return shareholder.company.id === companyId
    })

    const shareholderId = (myShareholders.length !== 0) ? myShareholders[0].id : null

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
      user: { shareholders },
      match: { params: { companyId }},
      meeting: { agreements }
    } = this.props
    const { current, shareholderId } = this.state;

    const myShareholders = shareholders.items.filter((shareholder) => {
      return shareholder.company.id === companyId
    })

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
          agreements={agreements.items}
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
            && (
              <Link to={`/${companyId}/meeting/next`}>
                <Button type="primary" onClick={() => message.success('Has votado!')}>Done</Button>
              </Link>
            )
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

export default compose(
  getMeeting,
  getUser,
)(App)

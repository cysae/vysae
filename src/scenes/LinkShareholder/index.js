import React from 'react'
// antd
import { Layout, Steps, Breadcrumb, Divider } from 'antd';
// components
import Register from './components/Register'
import Confirm from './components/Confirm'

const Step = Steps.Step;
const { Header, Footer, Content } = Layout


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
      <Layout>
        <Header>
          <h2 style={{color: '#fff'}}>Bienvenido a CYSAE</h2>
        </Header>
        <Content style={{ padding: '0 50px'}}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Incio</Breadcrumb.Item>
            <Breadcrumb.Item>Connectar</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <Divider orientation="left">Registración</Divider>
            <div className="steps-content" style={{width: '60vw', margin: 'auto'}}>
              {steps[current].content}
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          CYSAE ©2018
        </Footer>
      </Layout>
    );
  }
}

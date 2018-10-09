import React from 'react'
// Antd
import { Layout, Breadcrumb, Modal, message } from 'antd'
// Components
import MyHeader from '../../components/header.js'
import Companies from '../../scenes/Companies'
import Dashboard from '../../scenes/Dashboard'
import Meetings from '../../scenes/Meeting'
import Company from '../../scenes/Company'
// router
import { Route, Switch } from 'react-router-dom'
// amplify
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'
const { Content, Footer } = Layout;

class Administrator extends React.Component {
  state = { companyId: null }

  handleSelectCompanyId = (companyId) => {
    this.setState({ companyId })
    this.props.history.push(`/${companyId}/dashboard`)
  }

  handleSignOut = async () => {
    const hide = message.loading('Sign Out')
    await Auth.signOut()
    hide()
    window.location.href = '/'
  }

  render() {
    const { companyId } = this.state
    if (companyId === null) {
      return (
        <Modal
          title="Seleccionar Sociedad"
          visible={(companyId === null)}
          width="90vw"
          closable={false}
          footer={null}
        >
          <Companies
            handleSelectCompanyId={this.handleSelectCompanyId}
          />
        </Modal>
      )
    }

    return(
      <Layout>
        <MyHeader companyId={companyId} handleSignOut={this.handleSignOut} />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {/* <Breadcrumb.Item>Añadir sociedad</Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
              <Route exact path="/" component={Companies} />
              <Route path="/:companyId/dashboard" component={Dashboard} />
              <Route path="/:companyId/company" component={Company} />
              <Route path="/:companyId/meeting" component={Meetings}/>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Vysae © 2018
        </Footer>
      </Layout>
    )
  }
}

export default withAuthenticator(Administrator)

import React, { Component } from 'react'
// amplify
import Amplify, { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import aws_exports from './aws-exports';
// Router
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
// Antd
import { Layout, Breadcrumb, Modal, message } from 'antd'
// Components
import MyHeader from './components/header.js'
import CurrentCompanyRoute from './currentCompanyRoute.js'
import Companies from './scenes/Companies'
import Dashboard from './scenes/Dashboard'
import AddCompany from './containers/addCompany'
import Info from './containers/info'
import Meetings from './containers/meetings'
import Company from './scenes/Company'
// AppSync/Apollo
import appSyncConfig from './AppSync'
import AWSAppSyncClient, { createAppSyncLink, createLinkWithCache } from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider, withApollo, compose } from 'react-apollo';
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import './App.css'
Amplify.configure(aws_exports);
const { Content, Footer } = Layout;

// Apollo
const stateLink = createLinkWithCache(cache => withClientState({
  cache,
  defaults: {
    currentSelections: {
      __typename: 'currentSelections',
      companyId: null,
      shareholderId: null,
      meetingId: null
    }
  },
  resolvers: {
    Mutation: {
      mutateCurrentSelections: (_, {field, id }, { cache }) => {
        const data = {
          currentSelections: {
            __typename: 'currentSelections',
            [field]: id
          }
        }
        cache.writeData({ data })
        return data
      },
    }
  }
}))

const appSyncLink = createAppSyncLink({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey:  appSyncConfig.apiKey,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
})

const link = ApolloLink.from([stateLink, appSyncLink])

const client = new AWSAppSyncClient({}, { link })


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      companyId: null
    }

    this.handleSelectCompanyId = this.handleSelectCompanyId.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut = async () => {
    const hide = message.loading('Sign Out')
    await Auth.signOut()
    await this.props.client.resetStore()
    hide()
    window.location.href = '/'
    /* this.setState({ companyId: null }) */
    /* this.props.history.push('/') */
  }

  handleSelectCompanyId(companyId) {
    this.setState({ companyId })
    this.props.history.push(`/${companyId}/dashboard`)
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


    return (
      <Layout>
        <MyHeader companyId={companyId} handleSignOut={this.handleSignOut} />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {/* <Breadcrumb.Item>Añadir sociedad</Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Route exact path="/" component={Companies} />
            <Route path="/:companyId/dashboard" component={Dashboard} />
            <Route path="/añadirSociedad" component={AddCompany}/>
            <CurrentCompanyRoute
              path="/info"
              component={Info}
            />
            <CurrentCompanyRoute path="/company" component={Company} />
            <CurrentCompanyRoute
              path="/meetings"
              component={Meetings}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Vysae ©2018
        </Footer>
      </Layout>
    );
  }
}

const AppWithData = compose(
  withRouter,
  withApollo,
  withAuthenticator
)(App)

const WithApollo = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <AppWithData />
    </Rehydrated>
  </ApolloProvider>
);


export default WithApollo


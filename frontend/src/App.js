import React, { Component } from 'react'
// amplify
import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
// Router
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
// Antd
import { Layout, Breadcrumb, Modal } from 'antd'
// Components
import MyHeader from './components/header.js'
import CurrentCompanyRoute from './currentCompanyRoute.js'
import Companies from './scenes/Companies'
import Dashboard from './dashboard'
import AddCompany from './containers/addCompany'
import Info from './containers/info'
import Meetings from './containers/meetings'
import Company from './scenes/Company'
// AppSync/Apollo
import appSyncConfig from './AppSync'
import AWSAppSyncClient, { createAppSyncLink, createLinkWithCache } from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import './App.css'
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

    this.onSelectCompanyId = this.onSelectCompanyId.bind(this)
  }

  onSelectCompanyId(companyId) {
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
            onSelectCompanyId={this.onSelectCompanyId}
          />
        </Modal>
      )
    }


    return (
      <Layout>
        <MyHeader client={client} companyId={companyId} />
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

const WithApollo = (props) => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App history={props.history} />
    </Rehydrated>
  </ApolloProvider>
);


export default withAuthenticator(withRouter(WithApollo))


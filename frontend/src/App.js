import React, { Component } from 'react'
// amplify
import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
// Router
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
// Antd
import { Layout, Breadcrumb } from 'antd'
// Components
import MyHeader from './components/header.js'
import CurrentCompanyRoute from './currentCompanyRoute.js'
import Dashboard from './dashboard'
import AddCompany from './containers/addCompany'
import Info from './containers/info'
import Meetings from './containers/meetings'
// AppSync/Apollo
import AWSAppSyncClient, { createAppSyncLink, createLinkWithCache} from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { ApolloProvider } from 'react-apollo';
import AppSync from './AppSync.js';
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { compose, graphql } from 'react-apollo'
import mutateCurrentSelections from './queries/mutateCurrentSelections'
import './App.css'
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports.js'
import { updateUserAttributes } from './utils/amplify'
updateUserAttributes();
Amplify.configure(aws_exports)
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
        return null
      },
    }
  }
}))

const appSyncLink = createAppSyncLink({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
})

const link = ApolloLink.from([stateLink, appSyncLink])

const client = new AWSAppSyncClient({}, { link })


class App extends Component {
  state = {
    isLoading: true,
    shareholderId: null,
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser()
    const shareholderId = user.attributes['custom:shareholderId']
    this.props.mutateCurrentSelections({
      variables: {
        field: 'shareholderId',
        id: shareholderId
      }
    })
    this.setState({
      isLoading: false,
      shareholderId,
    })
  }

  render() {
    const { isLoading, shareholderId } = this.state

    if(isLoading) return <div>loading...</div>

    return (
      <Layout>
        <MyHeader />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Añadir sociedad</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Route
              exact
              path="/"
              render={() => <Dashboard shareholderId={shareholderId} />}
            />
            <Route path="/añadirSociedad" component={AddCompany}/>
            <CurrentCompanyRoute
              path="/info"
              component={Info}
              shareholderId={shareholderId}
            />
            <CurrentCompanyRoute path="/meetings" component={Meetings}/>
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
  graphql(mutateCurrentSelections, { name: 'mutateCurrentSelections' })
)(App)

const WithApollo = () => (
  <ApolloProvider
    client={client}
  >
    <Rehydrated>
      <AppWithData />
    </Rehydrated>
  </ApolloProvider>
);


export default withAuthenticator(withRouter(WithApollo))


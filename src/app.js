import React, { Component } from 'react'
// amplify
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from './aws-exports';
// Router
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
// Antd
import { Breadcrumb, Modal, message } from 'antd'
// Components
import LinkShareholder from './scenes/LinkShareholder'
import Administrator from './scenes/Administrator'
// AppSync/Apollo
import appSyncConfig from './AppSync'
import AWSAppSyncClient, { createAppSyncLink, createLinkWithCache } from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider, withApollo, compose } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import './App.css'
/* import addUserIdToCognito from './services/addUserIdtoCognitoUser'
 * addUserIdToCognito() */
Amplify.configure(aws_exports);

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
  cacheOptions: {
    dataIdFromObject: obj => {
      switch (obj.__typename) {
        case 'Agreement': return `Agreement:${obj.agreementId}`
        case 'Company': return `Company:${obj.companyId}`
        case 'Shareholder': return `Shareholder:${obj.shareholderId}`
        case 'ShareInterval': return `ShareInterval:${obj.companyId}-${obj.start}`
        case 'User': return `User:${obj.userId}`
        case 'Vote': return `Vote:${obj.agreementId}-${obj.shareholderId}`
        default: return defaultDataIdFromObject(obj)
      }
    }
  },
})

const link = ApolloLink.from([stateLink, appSyncLink])

const client = new AWSAppSyncClient({}, { link })


class App extends Component {
  constructor(props) {
    super(props)

    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut = async () => {
    const hide = message.loading('Sign Out')
    await this.props.client.resetStore()
    await Auth.signOut()
    hide()
    window.location.href = '/'
    /* this.setState({ companyId: null }) */
    /* this.props.history.push('/') */
  }


  render() {
    return (
      <Switch>
        <Route path="/linkShareholder/:companyId/:shareholderId" component={LinkShareholder} />
        <Route path="/" component={Administrator} />
      </Switch>
    );
  }
}

const AppWithData = compose(
  withRouter,
  withApollo,
)(App)

const WithApollo = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <AppWithData />
    </Rehydrated>
  </ApolloProvider>
);


export default WithApollo


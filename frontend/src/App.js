import React, { Component } from 'react'
import Amplify, { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import aws_exports from './aws-exports.js'
// Redux
import { connect } from 'react-redux'
import {
  requestSignedInUser,
} from './actions/index.js'
// Router
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
// Antd
import { Layout, Breadcrumb } from 'antd'
// Components
import MyHeader from './components/header.js'
import SelectCompanyRoute from './selectedCompanyRoute.js'
import Dashboard from './dashboard'
import AddCompany from './containers/addCompany'
import Info from './components/info'
import Meetings from './components/meetings'
// AppSync
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { graphql, ApolloProvider, compose } from 'react-apollo';
import * as AWS from 'aws-sdk';
import AppSync from './AppSync.js';

import './App.css'
Amplify.configure(aws_exports)
const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
     type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
     jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});
const { Content, Footer } = Layout;

class App extends Component {
  componentDidMount() {
    /* this.props.requestSignedInUser() */
  }

  render() {
    return (
      <Layout>
        <MyHeader />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Añadir sociedad</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/añadirSociedad" component={AddCompany}/>
            <SelectCompanyRoute path="/info" component={Info}/>
            <SelectCompanyRoute path="/meetings" component={Meetings}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Vysae ©2018
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    signedInUser: state.signedInUser
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestSignedInUser: () => {dispatch(requestSignedInUser())},
  }
}

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default withAuthenticator(withRouter(connect(mapStateToProps, mapDispatchToProps)(WithProvider)))


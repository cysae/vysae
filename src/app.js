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
import './App.css'
/* import addUserIdToCognito from './services/addUserIdtoCognitoUser'
 * addUserIdToCognito() */
Amplify.configure(aws_exports);

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

export default App


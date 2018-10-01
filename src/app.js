import React from 'react'
// Router
import { Route, Switch } from 'react-router-dom'
// Components
import LinkShareholder from './scenes/LinkShareholder'
import Administrator from './scenes/Administrator'
import './App.css'
// amplify
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports';
/* import addUserIdToCognito from './services/addUserIdtoCognitoUser'
 * addUserIdToCognito() */
Amplify.configure(aws_exports);

function App() {
  return (
    <Switch>
      <Route path="/linkShareholder/:companyId/:shareholderId" component={LinkShareholder} />
      <Route path="/" component={Administrator} />
    </Switch>
  );
}

export default App


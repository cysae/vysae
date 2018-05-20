import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
// Redux
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import reducers from './reducers/index.js'
// Redux-Router
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
// Components
import App from './App.js'

import './App.css'

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  reducers,
  applyMiddleware(
    logger,
    middleware
  )
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()


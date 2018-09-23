import React from 'react'
import "regenerator-runtime/runtime";
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
// Redux
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
/* import logger from 'redux-logger' */
import reducers from './reducers/index.js'
// Saga
import createSagaMiddleware from 'redux-saga'
import mySagas from './sagas/index.js'
// Redux-Router
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware as createRouterMiddleware} from 'react-router-redux'
// Components
import App from './app.js'
import './utils/company.js'
import './App.css'

const history = createHistory()
const routerMiddleware = createRouterMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(
    /* logger, */
    routerMiddleware,
    sagaMiddleware
  )
)

sagaMiddleware.run(mySagas)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()


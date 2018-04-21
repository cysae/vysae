import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// Redux
import { Provider } from 'react-redux'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import reducers from './reducers/index.js'
// Redux-Router
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(
    logger,
    middleware
  )
)

store.dispatch(push('/lol'))



ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
        <Route exact path="/" component={App}/>
        <Route path="/about" component={App}/>
      </Fragment>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()

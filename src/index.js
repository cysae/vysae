import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import vysaeApp from './reducers/index.js'
import App from './App'
import registerServiceWorker from './registerServiceWorker'



const store = createStore(
  vysaeApp,
  applyMiddleware(logger)
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()

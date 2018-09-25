import React from 'react'
import "regenerator-runtime/runtime";
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
// Router
import { BrowserRouter } from 'react-router-dom'
// Componen pfts
import App from './app.js'
import './utils/company.js'
import './App.css'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()


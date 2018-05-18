import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
// Antd
import { Layout, Menu, Breadcrumb } from 'antd'
// Redux
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { Link } from 'react-router-dom'
import logger from 'redux-logger'
import reducers from './reducers/index.js'
// Redux-Router
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
// Components
import Dashboard from './dashboard'
import AddCompany from './components/addCompany'
import Info from './components/info'

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
const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">Dashboard</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/añadirSociedad">Añadir Sociedad</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/info/company">Info</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Añadir sociedad</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/añadirSociedad" component={AddCompany}/>
            <Route path="/info" component={Info}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Vysae ©2018
        </Footer>
      </Layout>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()


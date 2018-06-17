import React, { Component } from 'react'
import Amplify, { Auth } from 'aws-amplify'
// antd
import { Layout, Row, Col, Button } from 'antd'
// Router
import { withRouter } from 'react-router'
// Components
import { HeaderMenu } from '../containers/menus.js'
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);
const { Header } = Layout


class MyHeader extends Component {
  constructor(props) {
    super(props)
    this.signOut = this.signOut.bind(this)
  }

  async signOut() {
    await Auth.signOut()
    window.location.href = '/'
  }

  render() {
    return(
      <Header>
        <Row type="flex" justify="space-between">
          <Col>
            <div className="logo" />
            <HeaderMenu />
          </Col>
          <Col>
            <Button onClick={this.signOut}>Log out</Button>
          </Col>
        </Row>
      </Header>
    )
  }
}

export default withRouter(MyHeader)

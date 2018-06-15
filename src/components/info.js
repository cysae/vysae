import React, { Component } from 'react'
import { Row, Col, Menu } from 'antd'
import { Route, Link } from 'react-router-dom'
// components
import { InfoMenu } from '../containers/menus.js'
import Company from '../containers/company.js'
import Profile from './profil.js'
import VotingSystem from './votingSystem.js'
import ShareholderRegister from './shareholderRegister.js'

export default class Info extends Component {
  render() {
    const { selectedCompany } = this.props

    return (
      <Row type="flex">
        <Col span={4}>
          <InfoMenu />
        </Col>
        <Col span={20}>
          <Route path="/info/company" render=
            {props =>
              <Company selectedCompany={selectedCompany} />
            }
          />
          <Route path="/info/profile" component={Profile} />
          <Route path="/info/voting-system" component={VotingSystem} />
          <Route path="/info/shareholder-registry" component={ShareholderRegister} />
        </Col>
      </Row>
    )
  }
}

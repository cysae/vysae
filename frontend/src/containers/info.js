import React, { Component } from 'react'
// antd
import { Row, Col, Spin } from 'antd'
// router
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
// components
import Company from '../components/company'
import Profile from '../components/profile'
import VotingSystem from '../components/votingSystem.js'
import ShareholderRegister from '../components/shareholderRegister'
// antd
import { Menu } from 'antd'
// apollo
import { graphql, compose } from 'react-apollo'
import queryCompany from '../queries/queryCompany'
import queryShareholder from '../queries/queryShareholder'
import queryCurrentSelections from '../queries/queryCurrentSelections'

class RawInfoMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    switch(pathname) {
      case '/info/company': return ['company']
      case '/info/profile': return ['profile']
      case '/info/voting-system': return ['votingSystem']
      case '/info/shareholder-registry': return ['shareholderRegistry']
      default: return ['company']
    }
  }

  render() {
    return (
      <Menu
        selectedKeys={this.getSelectedKey()}
      >
        <Menu.Item key="company">
          <Link to='/info/company'>Empresa</Link>
        </Menu.Item>
        {/* <Menu.Item key="profile">
            <Link to='/info/profile'>Perfil</Link>
            </Menu.Item>
            <Menu.Item key="votingSystem">
            <Link to='/info/voting-system'>Sistema de votación</Link>
            </Menu.Item>
            <Menu.Item key="shareholderRegistry">
            <Link to='/info/shareholder-registry'>Libro de socios</Link>
            </Menu.Item> */}
      </Menu>
    )
  }
}
const InfoMenu = withRouter(RawInfoMenu)

class Info extends Component {
  render() {
    const { company, shareholder, isCompanyLoading, isShareholderLoading } = this.props

    if (isCompanyLoading || isShareholderLoading)
      return <Spin size="large" />

    return (
      <Row type="flex">
        <Col span={4}>
          <InfoMenu />
        </Col>
        <Col span={20}>
          <Route path="/info/company" render=
            {props =>
              <Company
                company={company}
                shareholder={shareholder}
              />
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

const InfoWithData = compose(
  graphql(queryCurrentSelections, {
    props: ({ data: { loading, currentSelections: { companyId, shareholderId } } }) => ({
      isLoading: loading,
      currentCompanyId: companyId,
      currentShareholderId: shareholderId
    })
  }),
  graphql(queryCompany, {
    options: (props) => ({
      variables: {
        id: props.currentCompanyId
      }
    }),
    props: ({ data: { loading, queryCompany } }) => ({
      isCompanyLoading: loading,
      company: queryCompany
    })
  }),
  graphql(queryShareholder, {
    options: (props) => ({
      variables: {
        id: props.currentShareholderId
      },
    }),
    props: ({ data: { loading, queryShareholder }}) => ({
      isShareholderLoading: loading,
      shareholder: queryShareholder,
    })
  }),
)(Info)

export default InfoWithData

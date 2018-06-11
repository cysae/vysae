import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import PropTypes from 'prop-types'

const shareholder = {
  name: 'Dirk Hornung',
  email: 'dirkhornung91@gmail.com',
  registeredSince: '2011-10-05T14:48:00.000Z',
  shares: 750,
  shareRatio: 0.25
}

function Shareholder(props) {
  const { title, name, email, registeredSince, shares, shareRatio } = props
  return (
    <Card title={title}>
      <ul>
        <li>{name}</li>
        <li><a href={`mailto@${email}`}>{email}</a></li>
        <li>{`${shareRatio} - ${shares} participaciones`}</li>
        <li>Fecha de alta: {registeredSince}</li>
      </ul>
    </Card>
  )
}
Shareholder.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  shares: PropTypes.number.isRequired,
  shareRatio: PropTypes.number.isRequired
}

class Company extends Component {
  render() {
    const { name } = this.props.selectedCompany

    return (
      <Row type="flex">
        <Col span={12}>
          <Card title="Tu empresa">
            <ul>
              <li>Razon social: {name}</li>
              <li>Capital Social: 3000€</li>
              <li>Número de participaciones: 3000</li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Shareholder title="Tus datos" {...shareholder} />
        </Col>
        <Col span={12}>
          <Card title="Junta de socios">
            <Shareholder title="Presidente" {...shareholder} />
            <Shareholder title="Vicepresidente" {...shareholder} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Órgano de administración">
            <Shareholder title="Administrador único" {...shareholder} />
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Company

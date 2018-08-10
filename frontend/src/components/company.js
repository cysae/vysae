import React, { Component } from 'react'
// utils
import { Row, Col, Card } from 'antd'
/* import PropTypes from 'prop-types' */

/* const shareholder = {
 *   name: 'Dirk Hornung',
 *   email: 'dirkhornung91@gmail.com',
 *   registeredSince: '2011-10-05T14:48:00.000Z',
 *   shares: 750,
 *   shareRatio: 0.25
 * } */

function Shareholder(props) {
  const { name } = props
  return (
    <Card title="Tu">
      <ul>
        <li>Name: {name}</li>
        {/* <li>DNI: {dni}</li> */}
        {/* <li>Email: {email}</li> */}
        {/* <li><a href={`mailto@${email}`}>{email}</a></li>
            <li>{`${shareRatio} - ${shares} participaciones`}</li>
            <li>Fecha de alta: {registeredSince}</li> */}
      </ul>
    </Card>
  )
}
/* Shareholder.propTypes = {
 *   dni: PropTypes.string.isRequired,
 *   email: PropTypes.string.isRequired,
 * } */

class Company extends Component {
  render() {
    const { company, isLoading } = this.props

    if( isLoading ) return <div>loading...</div>

    return (
      <Row type="flex">
        <Col span={12}>
          <Card title="Tu empresa">
            <ul>
              <li>Razon social: {company.name}</li>
              {/* <li>Capital Social: {company.capital}€</li> */}
              {/* <li>Número de participaciones: {company.shares}</li> */}
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Shareholder title="Tus datos" {...this.props.shareholder} />
        </Col>
        {/* <Col span={12}>
            <Card title="Junta de socios">
            <Shareholder title="Presidente" {...shareholder} />
            <Shareholder title="Vicepresidente" {...shareholder} />
            </Card>
            </Col>
            <Col span={12}>
            <Card title="Órgano de administración">
            <Shareholder title="Administrador único" {...shareholder} />
            </Card>
            </Col> */}
      </Row>
    )
  }
}

export default Company

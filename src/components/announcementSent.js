import React, { Component, Fragment } from 'react'
import { Row, Col, Icon } from 'antd'


class AnnouncementSent extends Component {
  render() {
    return (
      <Fragment>
        <Row type="flex" justify="center" style={{marginBottom: 20}}>
          <Col>
            <h1 style={{textAlign: 'center', color: 'green'}}>Convocatoria enviado</h1>
            <h2>Hemos informado a todas las socios</h2>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <Icon style={{fontSize: '15rem', color: 'green'}} type="check-circle-o" />
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default AnnouncementSent

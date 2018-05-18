import React, { Component } from 'react'
import { Row, Col, List, Icon } from 'antd'
import PropTypes from 'prop-types'

const majorities = [{
  id: 0,
  title: 'Mayoría ordinaria',
  agreements: [{
    title: 'Aumento o reducción de capital',
  }]
}, {
  id: 1,
  title: 'Mayoría reforzada',
  agreements: [{
    title: 'Aumento o reducción de capital',
  }, {
    title: 'Autorización a administradores para que se dediquen a actividad inmersa en el objecto social'
  }]
}]


class VotingSystem extends Component {
  state = {
    selectedMajorityId: 0,
  }

  selectMajorityId(id) {
    this.setState({ selectedMajorityId: id })
  }

  getAgreementList(id) {
    const agreementList = []
    for(const majority of majorities) {
      if(majority.id === id) {
        return majority.agreements
      }
    }
    return null
  }

  render() {
    const { selectedMajorityId } = this.state
    const IconText = ({ type, onClick, text }) => (
      <span onClick={onClick}>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const agreements = this.getAgreementList(selectedMajorityId)

    return (
      <Row type="flex">
        <Col span={12}>
          <List
            itemLayout="vertical"
            size="large"
            header={<h2>Tipos de Mayorías</h2>}
            dataSource={majorities}
            renderItem={item => (
              <List.Item
                key={item.title}
                    actions={[<IconText type="bars" onClick={() => this.selectMajorityId(item.id)} text="Mostrar acuerdos" />]}>
                <List.Item.Meta
                  title={item.title}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <List
            itemLayout="vertical"
            size="large"
            header={<h2>Tipos de Mayorías</h2>}
            dataSource={agreements}
            renderItem={item => (
              <List.Item key={item.title}>
                <List.Item.Meta
                  title={item.title}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    )
  }
}

export default VotingSystem

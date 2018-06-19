import React, { Component, Fragment } from 'react'
import { List, Radio, Button } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class meetingVote extends Component {
  state = {
    agreementTypes: [
      'Aumento o reducción de capital',
      'Autorización a administradores para que se dediquen a actividad inmersa en el objecto social',
      'Autorización a administradores para que se dediquen a actividad inmersa en el objeto social',
      'Exclusión y separación de socios',
      'Cambio de domicilio',
      'Supresión o limitación del derecho de prederencia en aumentos de capital',
      'Modificación estructural',
      'Cesión global de activo y pasivo',
    ]
  }

  render() {
    console.log(this.props)
    const { agreementTypes } = this.props.meeting
    return (
      <Fragment>
        <List
          header={<div>CONVOCATORIA A LA JUNTA GENERAL DE SOCIOS</div>}
          footer={<Button><Link to="/meetings/result">Votar</Link></Button>}
          bordered
          dataSource={agreementTypes}
          renderItem={item => (
            <List.Item actions={[
              <RadioGroup>
                <RadioButton value="yes">Sí</RadioButton>
                <RadioButton value="blank">En blanco</RadioButton>
                <RadioButton value="no">No</RadioButton>
              </RadioGroup>
            ]}>
              {item}
            </List.Item>)}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  meeting: state.selectedMeeting
})

export default connect(mapStateToProps)(meetingVote)
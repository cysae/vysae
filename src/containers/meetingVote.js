import React, { Component, Fragment } from 'react'
import { Form, List, Radio, Button } from 'antd'
import { Link } from 'react-router-dom'
// redux
import { connect } from 'react-redux'
import {
  updateVoteForm,
  requestVote
} from '../actions/index.js'
const FormItem = Form.Item
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function HOCForm(formComponent) {
  return connect(state => ({
    formState: {...state.voteForm},
    user: state.signedInUser,
    meeting: state.selectedMeeting,
  }))(Form.create({
    onFieldsChange(props, changedFields) {
      props.dispatch(updateVoteForm(changedFields))
    },
    mapPropsToFields(props) {
      const fields = {};
      for (const key in props.formState) {
        fields[key] = Form.createFormField(props.formState[key])
      }
      return fields;
    },
    onValuesChange(_, values) {
      /* console.log(values); */
    },
  })(formComponent))
}

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
    const { requestVote, meeting, form } = this.props
    const { agreementTypes } = meeting
    const { getFieldDecorator } = form
    return (
      <Fragment>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <List
            header={<div>CONVOCATORIA A LA JUNTA GENERAL DE SOCIOS</div>}
            footer={<Button><Link to="/meetings/result">Votar</Link></Button>}
            bordered
            dataSource={agreementTypes}
            renderItem={item => (
              <List.Item actions={[
                <FormItem>
                  {getFieldDecorator(item, {
                     rules: [{ required: true, message: 'Es obligatorio.' }],
                  })(
                     <RadioGroup>
                       <RadioButton value="yes">Sí</RadioButton>
                       <RadioButton value="blank">En blanco</RadioButton>
                       <RadioButton value="no">No</RadioButton>
                     </RadioGroup>
                   )}
                </FormItem>
              ]}>
                {item}
              </List.Item>)}
          />
        </Form>
      </Fragment>
    )
  }
}


export default HOCForm(meetingVote)

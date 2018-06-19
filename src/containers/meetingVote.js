import React from 'react'
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
  })(dispatch => ({
    requestVote: vote => dispatch(requestVote(vote))
  }))(formComponent))
}

const meetingVote = props => {
  const { requestVote, meeting, form } = this.props
  const { agreementTypes } = meeting
  const { getFieldDecorator } = form
  return (
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
  )
}


export default HOCForm(meetingVote)

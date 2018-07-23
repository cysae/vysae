import React, { Component } from 'react'
import { Form, List, Radio, Button } from 'antd'
// redux
import { connect } from 'react-redux'
import {
  updateVoteForm,
  requestVote
} from '../actions/index.js'
import { Link } from 'react-router-dom'
const FormItem = Form.Item
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function roughSizeOfObject( object ) {

  var objectList = [];
  var stack = [ object ];
  var bytes = 0;

  while ( stack.length ) {
    var value = stack.pop();

    if ( typeof value === 'boolean' ) {
      bytes += 4;
    }
    else if ( typeof value === 'string' ) {
      bytes += value.length * 2;
    }
    else if ( typeof value === 'number' ) {
      bytes += 8;
    }
    else if
    (
      typeof value === 'object'
      && objectList.indexOf( value ) === -1
    )
    {
      objectList.push( value );

      for( var i in value ) {
        stack.push( value[ i ] );
      }
    }
  }
  return bytes;
}

function HOCForm(formComponent) {
  return connect(state => ({
    formState: {...state.voteForm},
    user: state.signedInUser,
    meeting: state.selectedMeeting,
    company: state.selectedCompany,
  }), dispatch => ({
    requestVote: (vote, meetingId, companyId) => dispatch(requestVote(vote, meetingId, companyId)),
    dispatch: dispatch,
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

class MeetingVote extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { requestVote, form, meeting, company } = this.props
        requestVote(form.getFieldsValue(), meeting.uuid, company.uuid)
      }
    });
  }

  render() {
    const { meeting, form } = this.props
    const { agreementTypes } = meeting
    const { getFieldDecorator } = form
    console.log(roughSizeOfObject(this.props.company))
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <List
          header={<div>CONVOCATORIA A LA JUNTA GENERAL DE SOCIOS</div>}
          footer={
            <FormItem>
              <Button type="primary" htmlType="submit">
                <Link to="/meetings/result">
                  Continuar
                </Link>
              </Button>
            </FormItem>
          }
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
}


export default HOCForm(MeetingVote)

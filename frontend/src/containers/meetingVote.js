import React, { Component, Fragment } from 'react'
import { Form, List, Radio, Button, Divider, Spin } from 'antd'
// redux
import { connect } from 'react-redux'
import {
  updateVoteForm,
  requestVote
} from '../actions/index.js'
import { Link } from 'react-router-dom'
// graphql
import { compose, graphql } from 'react-apollo'
import queryCurrentSelections from '../queries/queryCurrentSelections'
import queryMeeting from '../queries/queryMeeting'

const FormItem = Form.Item
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
    const {  meeting, form } = this.props
    const { agreements } = meeting
    const { getFieldDecorator } = form

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <List
          header={<div>CONVOCATORIA A LA JUNTA GENERAL DE SOCIOS</div>}
          footer={
            <Fragment>
              <FormItem>
                <Button type="primary">
                  <Link to="/meetings/next">
                    Atras
                  </Link>
                </Button>
                <Divider type="vertical" />
                <Button type="primary" htmlType="submit">
                  <Link to="/meetings/result">
                    Continuar
                  </Link>
                </Button>
              </FormItem>
            </Fragment>
          }
          bordered
          dataSource={agreements}
          renderItem={item => (
            <List.Item actions={[
              <FormItem>
                {getFieldDecorator(item.name, {
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
              {item.name}
            </List.Item>)}
        />
      </Form>
    )
  }
}

export default Form.create()(MeetingVote)

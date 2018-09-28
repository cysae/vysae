import React, { Component } from 'react'
// antd
import { Form, List, Radio } from 'antd'

const FormItem = Form.Item
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class MeetingVote extends Component {
  state = {
    isLoading: false
  }

  handleChange = (result, agreementId) => {
    const { shareholderId, createVote } = this.props
    const vote = {
      agreementId,
      result,
      shareholderId
    }

    createVote(vote)
  }

  myVoteResult = (agreement, isValue) => {
    const { shareholderId } = this.props
    for(const vote of agreement.votes) {
      if(vote.shareholderId === shareholderId) {
        return vote.result === isValue
      }
    }
    return null
  }

  render() {
    const {
      meetingId,
      agreements
    } = this.props

    /* let agreements = {}
     * for (const meeting of meetings.items) {
     *   if(meeting.meetingId === meetingId) {
     *     agreements = meeting.agreements
     *     break;
     *   }
     * } */

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <List
          header={<div>CONVOCATORIA A LA JUNTA GENERAL DE SOCIOS</div>}
          bordered
          dataSource={agreements}
          renderItem={item => (
            <List.Item actions={[
              <FormItem>
                <RadioGroup onChange={({ target: { value}}) => this.handleChange(value, item.agreementId)}>
                  <RadioButton value={1} checked={this.myVoteResult(item, 1)}>Sí</RadioButton>
                  <RadioButton value={0} checked={this.myVoteResult(item, 0)}>En blanco</RadioButton>
                  <RadioButton value={-1} checked={this.myVoteResult(item, -1)}>No</RadioButton>
                </RadioGroup>
              </FormItem>
            ]}>
              {item.name}
            </List.Item>)}
        />
      </Form>
    )
  }
}


export default MeetingVote

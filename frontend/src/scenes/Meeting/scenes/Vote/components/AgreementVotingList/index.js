import React, { Component, Fragment } from 'react'
// antd
import { Form, List, Radio, Button, Divider, Spin } from 'antd'
import { Link } from 'react-router-dom'
// graphql
import { compose } from 'react-apollo'
// services
import getCompany from '../../../../../../services/getCompany'
// router
import { withRouter } from 'react-router'

const FormItem = Form.Item
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class MeetingVote extends Component {
  state = {
    isLoading: false
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { createVotesWithAgreementId, form } = this.props
        const votesWithAgreementId = []

        this.setState({ isLoading: true })
        for (const agreementId in form.getFieldsValue()) {
          const vote = {
            result: form.getFieldsValue()[agreementId]
          }
          votesWithAgreementId.push({
            agreementId,
            vote
          })
        }

        createVotesWithAgreementId(votesWithAgreementId)
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      company: { meetings },
      match: { params: { meetingId }},
    } = this.props

    let agreements = {}
    for (const meeting of meetings.items) {
      console.log(meeting)
      if(meeting.meetingId === meetingId) {
        agreements = meeting.agreements
        break;
      }
    }

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <List
          header={<div>CONVOCATORIA A LA JUNTA GENERAL DE SOCIOS</div>}
          bordered
          dataSource={agreements}
          renderItem={item => (
            <List.Item actions={[
              <FormItem>
                {getFieldDecorator(item.agreementId, {
                   rules: [{ required: true, message: 'Es obligatorio.' }],
                })(
                   <RadioGroup>
                     <RadioButton value={1}>Sí</RadioButton>
                     <RadioButton value={0}>En blanco</RadioButton>
                     <RadioButton value={-1}>No</RadioButton>
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


export default compose(
  Form.create(),
  withRouter,
  getCompany,
  /* graphql(
   *   MutationCreateVotesWithAgreementId,
   *   {
   *     options: props => ({
   *       update: (proxy, { data: { createVotesForAgreements } }) => {

   *         if ( createVotesForAgreements !== null ) {
   *           const query = QueryGetMeeting
   *           const variables = { id: props.match.params.id, withAgreements: true, withVotes: true }
   *           const data = proxy.readQuery({ query, variables })

   *           for (const agreement of createVotesForAgreements) {
   *             const agreementId = agreement.id
   *             const vote = agreement.votes[0]

   *             let agreementIndex
   *             const agreements = data.getMeeting.agreements
   *             for (agreementIndex in agreements) {
   *               if (agreements[agreementIndex].id === agreementId)
   *                 break
   *             }

   *             if ( typeof agreements[agreementIndex].votes === 'undefined' )
   *               data.getMeeting.agreements[agreementIndex].votes = []

   *             data.getMeeting.agreements[agreementIndex].votes.push(vote)
   *           }

   *           proxy.writeQuery({ query, data, variables })
   *           props.history.push(`/meetings/result/${data.getMeeting.id}`)
   *         }
   *       }
   *     }),
   *     props: (props) => ({
   *       createVotesWithAgreementId: (votesWithAgreementId) => props.mutate({
   *         variables: {
   *           votesWithAgreementId
   *         }
   *       })
   *     })
   *   }
   * ) */
)(MeetingVote)

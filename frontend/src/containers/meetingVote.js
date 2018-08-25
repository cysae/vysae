import React, { Component, Fragment } from 'react'
// antd
import { Form, List, Radio, Button, Divider, Spin } from 'antd'
import { Link } from 'react-router-dom'
// graphql
import { graphql } from 'react-apollo'
import MutationCreateVotesWithAgreementId from '../queries/MutationCreateVotesWithAgreementId'
import queryCompany from '../queries/queryCompany'
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
    const { meeting, form } = this.props
    const { agreements } = meeting
    const { getFieldDecorator } = form

    if (this.state.isLoading) return <Spin size="large" />

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
                  {/* <Link to="/meetings/result"> */}
                    Continuar
                  {/* </Link> */}
                </Button>
              </FormItem>
            </Fragment>
          }
          bordered
          dataSource={agreements}
          renderItem={item => (
            <List.Item actions={[
              <FormItem>
                {getFieldDecorator(item.id, {
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


export default withRouter(graphql(
  MutationCreateVotesWithAgreementId,
  {
    options: props => ({
      update: (proxy, { data: { createVotesForAgreements } }) => {
        if ( createVotesForAgreements !== null ) {
          const query = queryCompany
          const variables = { id: props.companyId, withMeetings: true, withAgreements: true, withVotes: true }
          const data = proxy.readQuery({ query, variables })

          const meetingId = props.meeting.id

          let meetingIndex
          const meetings = data.queryCompany.meetings
          for (meetingIndex in meetings) {
            if (meetings[meetingIndex].id === meetingId) {
              break;
            }
          }

          for (const agreement of createVotesForAgreements) {
            const agreementId = agreement.id
            const vote = agreement.votes[0]

            let agreementIndex
            const agreements = data.queryCompany.meetings[meetingIndex].agreements
            for (agreementIndex in agreements) {
              if (agreements[agreementIndex].id === agreementId)
                break
            }
            if ( typeof data.queryCompany.meetings[meetingIndex].agreements[agreementIndex].votes === 'undefined' )
              data.queryCompany.meetings[meetingIndex].agreements[agreementIndex].votes = []
            data.queryCompany.meetings[meetingIndex].agreements[agreementIndex].votes.push(vote)
          }

          proxy.writeQuery({ query, data, variables })
          props.history.push('/meetings/result')
        }
      }
    }),
    props: (props) => ({
      createVotesWithAgreementId: (votesWithAgreementId) => props.mutate({
        variables: {
          votesWithAgreementId
        }
      })
    })
  }
)(Form.create()(MeetingVote)))

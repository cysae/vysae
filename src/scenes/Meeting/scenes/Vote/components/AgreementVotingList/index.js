import React, { Component } from 'react'
// antd
import { Form, List, Radio } from 'antd'
// graphql
import { graphql, compose } from 'react-apollo'
import MutationCreateVote from '../../../../../../queries/MutationCreateVote'
import QueryGetCompany from '../../../../../../queries/QueryGetCompany'
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
      company: { meetings },
      match: { params: { meetingId }},
    } = this.props

    let agreements = {}
    for (const meeting of meetings.items) {
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


export default compose(
  graphql(
    MutationCreateVote,
    {
      props: props => ({
        createVote: (vote) => {
          const { companyId, meetingId } = props.ownProps
          return props.mutate({
            variables: {
              vote,
            },
            optimisticResponse: {
              createVote: {
                __typename: 'Vote',
                ...vote,
              }
            },
            update: (proxy, { data, ...rest }) => {
              const query = QueryGetCompany
              const newData = proxy.readQuery({
                query,
                variables: {
                  companyId,
                }
              })

              for(const meeting of newData.getCompany.meetings.items) {
                if(meeting.meetingId === meetingId) {
                  for( const agreement of meeting.agreements ) {
                    if (agreement.agreementId === data.createVote.agreementId) {
                      if(agreement.votes === undefined) {
                        agreement.votes = []
                      }
                      let voteExists = false
                      for(const vote of agreement.votes) {
                        if(
                          vote.shareholderId === data.createVote.shareholderId &&
                          vote.agreementId === data.createVote.agreementId
                        ) {
                          vote.result = data.createVote.result
                          voteExists = true
                          break;
                        }
                      }
                      if(!voteExists)
                        agreement.votes.push(data.createVote)
                      break;
                    }
                  }
                  break;
                }
              }

              proxy.writeQuery({
                query,
                variables: {
                  companyId
                },
                data: newData
              })
            }
          })
        }
      }),
    }
  ),
  withRouter,
  getCompany,
  )(MeetingVote)

import React, { Component, Fragment } from 'react'
// antd
import { Form, List, Radio, Button, Divider, Spin } from 'antd'
import { Link } from 'react-router-dom'
// graphql
import { compose, graphql } from 'react-apollo'
import MutationCreateVotes from '../queries/MutationCreateVotes'
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
        const { createVote, form, history } = this.props
        const votes = []

        this.setState({ isLoading: true })
        for (const agreementId in form.getFieldsValue()) {
          const vote = {
            result: form.getFieldsValue()[agreementId]
          }
          votes.push(vote)
        }
        createVotes(agreementId, votes)
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


export default graphql(
  MutationCreateVotes,
  {
    options: props => ({
      update: (proxy, { data }) => {
        const { companyId } = props
        console.log(data, props)
        const query = queryCompany
        /* const variables = { id: } */
        /* history.push('/meetings/result') */
      }
    }),
    props: (props) => ({
      createVotes: (agreementId, votes) => props.mutate({
        variables: {
          agreementId,
          votes
        }
      })
    })
  }
)(Form.create()(withRouter(MeetingVote)))

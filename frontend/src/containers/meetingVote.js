import React, { Component, Fragment } from 'react'
// antd
import { Form, List, Radio, Button, Divider, Spin } from 'antd'
import { Link } from 'react-router-dom'
// graphql
import { compose, graphql } from 'react-apollo'
import MutationCreateVote from '../queries/MutationCreateVote'
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

        this.setState({ isLoading: true })
        for (const agreementId in form.getFieldsValue()) {
          const vote = {
            result: form.getFieldsValue()[agreementId]
          }
          createVote(agreementId, vote)
        }
        /* history.push('/meetings/result') */
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
  MutationCreateVote,
  {
    options: props => ({
      update: (proxy, { data }) => {
        const { companyId } = props
        console.log(data, props)
        const query = queryCompany
        /* const variables = { id: } */
      }
    }),
    props: (props) => ({
      createVote: async (agreementId, vote) => await props.mutate({
        variables: {
          agreementId,
          vote
        }
      })
    })
  }
)(Form.create()(withRouter(MeetingVote)))

import React, { Component } from 'react'
// antd
import { Form, List, Radio, message } from 'antd'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { CreateVote } from '../../../../../../graphql/mutations'

const FormItem = Form.Item
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class MeetingVote extends Component {
  state = {
    isLoading: false
  }

  handleChange = (result, agreementId) => {
    const { shareholderId } = this.props

    const hideLoadingMsg = message.loading('Votando...')

    API.graphql(graphqlOperation(gqlToString(CreateVote), {
      input: {
        result,
        voteAgreementId: agreementId,
        voteShareholderId: shareholderId
      }
    })).then(() => {
      hideLoadingMsg()
      message.success('Voto guardado')
    }).catch((err) => {
      console.error(err)
      hideLoadingMsg()
      message.error('error')
    })
  }

  render() {
    const {
      agreements
    } = this.props

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <List
          header={<div>CONVOCATORIA A LA JUNTA GENERAL DE SOCIOS</div>}
          bordered
          dataSource={agreements}
          renderItem={item => (
            <List.Item actions={[
              <FormItem>
                <RadioGroup onChange={({ target: { value}}) => this.handleChange(value, item.id)}>
                  <RadioButton value={1}>Sí</RadioButton>
                  <RadioButton value={0}>En blanco</RadioButton>
                  <RadioButton value={-1}>No</RadioButton>
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

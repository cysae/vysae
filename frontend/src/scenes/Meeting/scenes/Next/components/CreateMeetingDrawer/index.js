import React from 'react'
// antd
import {
  Drawer, Form, Button, Col, Row, DatePicker,
  notification
} from 'antd';
// graphql
import { compose, graphql } from 'react-apollo'
import MutationCreateMeeting from '../../../../../../queries/MutationCreateMeeting'
import QueryGetCompany from '../../../../../../queries/QueryGetCompany'

const { RangePicker } = DatePicker

class CreateMeetingDrawer extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    const { form: { validateFields }, createMeeting, companyId } = this.props
    validateFields((err, values) => {
      if (!err) {
        const meeting = {
          start: values.dateRange[0].toISOString(),
          end: values.dateRange[1].toISOString(),
        }

        createMeeting(companyId, meeting)
          .then(res => {
            notification.success({
              message: `Junta añadida!`,
              description: `Has guardado la junta.`
            })
            this.onClose()
          })
      }
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Convocar Junta
        </Button>
        <Drawer
          title="Create"
          width={720}
          placement="right"
          onClose={this.onClose}
          maskClosable={false}
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Start - End">
                  {getFieldDecorator('dateRange', {
                     rules: [{ required: true, message: 'please enter company name' }],
                  })(
                     <RangePicker
                       showTime={{ format: 'HH:mm' }}
                       format='YYYY-MM-DD HH:mm'
                       placeholder={['Start Time', 'End Time']}
                     />
                   )}
                </Form.Item>
              </Col>
            </Row>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
              }}
            >
              <Button
                style={{
                  marginRight: 8,
                }}
                onClick={this.onClose}
              >
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">Submit</Button>
            </div>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default compose(
  Form.create(),
  graphql(
    MutationCreateMeeting,
    {
      props: props => ({
        createMeeting: (companyId, meeting) => {
          return props.mutate({
            variables: { companyId, meeting },
            optimisticResponse: {
              __typename: "Mutation",
              createMeeting: {
                __typename: "Meeting",
                meetingId: 'id',
                ...meeting
              }
            },
            update: (proxy, { data }) => {
              console.log(data)
              const query = QueryGetCompany
              const companyData = proxy.readQuery({ query, variables: { companyId }})

              companyData.getCompany.meetings.items.push(data.createMeeting)

              proxy.writeQuery({ query, variables: { companyId }, data: companyData })
            }
          })
        }
      })

    }
  )
)(CreateMeetingDrawer)

import React from 'react'
// antd
import {
  Drawer, Form, Button, Col, Row, DatePicker,
  Input, notification, Select, message
} from 'antd';
// services
import { compose } from 'recompose'

const { RangePicker } = DatePicker
const Option = Select.Option

class CreateMeetingDrawer extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      form: { validateFields },
      agreements,
      createMeeting
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        const meeting = {
          name: values.name,
          start: values.votingPeriod[0].toISOString(),
          end: values.votingPeriod[1].toISOString(),
        }

        // retrieve selected agreements and remove id key
        const selectedAgreements = agreements.filter((agreement) => {
          return !!values.agreementIds.find((id) => agreement.id === id)
        }).map((agreement) => {
          const {id, ...selected} = agreement
          return selected
        })

        createMeeting(meeting, selectedAgreements)
          .then(res => {
            notification.success({
              message: `Junta añadida!`,
              description: `Has convocado una junta.`
            })
            this.onClose()
          }).catch(err => {
            message.error('error')
            console.error(err)
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
    const {
      form: { getFieldDecorator },
      agreements,
    } = this.props;
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
                <Form.Item label="Nombre">
                  {getFieldDecorator('name', {
                     rules: [{ required: true, message: 'please enter company name' }],
                  })(
                     <Input />
                   )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Duracion">
                  {getFieldDecorator('votingPeriod', {
                     rules: [{ required: true, message: 'please enter company name' }],
                  })(
                     <RangePicker
                       showTime={{ format: 'HH:mm' }}
                       format='YYYY-MM-DD HH:mm'
                       placeholder={['Inicio', 'Final']}
                     />
                   )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Duracion">
                  {getFieldDecorator('agreementIds', {
                     rules: [{ required: true, message: 'please enter company name' }],
                  })(
                     <Select
                       mode="multiple"
                       placeholder="Seleccionar acuerdos"
                     >
                       {agreements.map((agreement) => (
                         <Option key={agreement.id}>{agreement.name}</Option>
                       ))}
                     </Select>
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
)(CreateMeetingDrawer)

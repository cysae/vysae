import React from 'react'
// antd
import {
  Drawer, Form, Button, Col, Row, Input, message
} from 'antd';
// services
import { compose } from 'recompose'

class CreateShareholderDrawer extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()

    const {
      form: {
        validateFields,
        resetFields
      }
    } = this.props

    validateFields((err, values) => {
      if (err) return

      const shareholder = {
        ...values
      }

      const { createShareholder } = this.props
      createShareholder(shareholder).then(() => {
        resetFields()
        this.onClose()
      }).catch(err => {
        message.error('error', 2.5)
        console.error(err)
      })
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;

    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Añadir Socio
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
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit} >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                     rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input placeholder="please enter user name" />)}
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                  <Form.Item label="DNI">
                  {getFieldDecorator('dni', {
                  rules: [{ required: true, message: 'please enter user DNI' }],
                  })(<Input placeholder="please enter user name" />)}
                  </Form.Item>
                  </Col> */}
            </Row>
            {/* <Row gutter={16}>
                <Col span={12}>
                <Form.Item label="Email">
                {getFieldDecorator('email', {
                rules: [{ required: true, message: 'please enter email' }],
                })(
                <Input
                style={{ width: '100%' }}
                placeholder="please enter email"
                />
                )}
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="Número de Teléfono">
                {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'please enter phone' }],
                })(
                <Input
                style={{ width: '100%' }}
                addonBefore="+34"
                placeholder="please enter phone"
                />
                )}
                </Form.Item>
                </Col>
                </Row> */}
            {/* <Row gutter={16}>
                <Col span={24}>
                <Form.Item label="Description">
                {getFieldDecorator('description', {
                rules: [
                {
                required: true,
                message: 'please enter url description',
                },
                ],
                })(<Input.TextArea rows={4} placeholder="please enter url description" />)}
                </Form.Item>
                </Col>
                </Row> */}
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
              <Button htmlType="submit" type="primary">Submit</Button>
            </div>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default compose(
  Form.create(),
)(CreateShareholderDrawer)

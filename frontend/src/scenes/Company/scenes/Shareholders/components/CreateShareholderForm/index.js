import React from 'react'
// antd
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
// amplify
import { Auth } from 'aws-amplify'
import generator from 'generate-password'


const { Option } = Select;

class DrawerForm extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  addShareholder = async () => {
    const { form: { getFieldValue } } = this.props
    try {
      await Auth.signUp({
        username: getFieldValue('dni'),
        password: generator.generate({ numbers: true, symbols: true, strict: true }),
        attributes: {
          email: getFieldValue('email'),
          phone_number: `+34${getFieldValue('phone')}`
        }
      })
    }
    catch (err) {
      console.error(err)
    }
    this.onClose()
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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input placeholder="please enter user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="DNI">
                  {getFieldDecorator('dni', {
                     rules: [{ required: true, message: 'please enter user DNI' }],
                  })(<Input placeholder="please enter user name" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
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
            </Row>
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
          </Form>
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
            <Button onClick={this.addShareholder} type="primary">Submit</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default Form.create()(DrawerForm);

import React from 'react'
// antd
import {
  Drawer, Form, Button, Col, Row, Input,
  notification
} from 'antd';
// services
import { compose } from 'recompose'

class LinkShareholderDrawer extends React.Component {
  state = { visible: false };

  componentDidMount() {
    /* const { form: { setFieldsValue }} = this.props */

    /* setFieldsValue({
     *   name
     * }) */
  }

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
      linkShareholderWithUser,
      shareholder,
      form: {
        getFieldValue,
        validateFields
      }
    } = this.props

    validateFields((err, values) => {
      if (!err) {
        const user = {
          username: getFieldValue('dni'),
          email: getFieldValue('email'),
          phone_number: `+34${getFieldValue('phone_number')}`
        }

        linkShareholderWithUser(shareholder.id, user)
          .then(res => {
            notification.success({
              message: `Shareholder linked!`,
              description: `Has linked un shareholder con un usario.`
            })
            this.onClose()
          })
          .catch(err => {
            notification.error({
              message: `DNI ya existe!`,
              description: `No puedo crear un nuevo usario.`
            })
          })
      }
    })
  }

  render() {
    const {  form: { getFieldDecorator } } = this.props;

    return (
      <div>
        <Button onClick={this.showDrawer}>Link User</Button>
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
                  {getFieldDecorator('phone_number', {
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
)(LinkShareholderDrawer)

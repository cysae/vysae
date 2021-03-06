import React from 'react'
// antd
import { Drawer, Form, Button, Col, Row, Input, notification, message } from 'antd';
import createCompany from '../../services/createCompany'

class CreateCompanyDrawer extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      userId,
      form,
      form: { validateFields }
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        const hideLoadingMsg = message.loading('Guardando...', 0)
        createCompany(userId, { input: { name: values.name }})
          .then(res => {
            notification.success({
              message: `¡Sociedad añadida!`,
              description: `Has guardado la sociedad: ${values.name}.`
            })
            form.resetFields()
            this.onClose()
          })
          .catch(err => {
            console.log('createCompanyDrawer error: ', err)
          })
          .finally(() => hideLoadingMsg())
      }
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { form: { getFieldDecorator }} = this.props;

    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Dar de alta una Sociedad Limitada
        </Button>
        <Drawer
          title="Crear"
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
                <Form.Item label="Denominación Social">
                  {getFieldDecorator('name', {
                     rules: [{ required: true, message: 'La denominación es obligatoria' }],
                  })(<Input placeholder="Escribe la denominación social aquí" addonAfter=", S.L."/>)}
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
              <Button type="primary" htmlType="submit">Guardar</Button>
            </div>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default Form.create()(CreateCompanyDrawer)

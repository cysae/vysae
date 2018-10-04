import React from 'react'
// antd
import {
  Drawer, Form, Button, Col, Row, Input, message, Radio
} from 'antd';
// services
import { compose } from 'recompose'
const RadioGroup = Radio.Group

class CreateShareholderDrawer extends React.Component {
  state = {
    visible: false,
    isCreatingShareholder: false,
  };

  componentDidMount() {
    this.props.form.setFieldsValue({personType: 'natural'})
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    const { form: { resetFields, setFieldsValue }} = this.props
    this.setState({
      visible: false,
      isCreatingShareholder: false
    });
    resetFields()
    setFieldsValue({personType: 'natural'})
  };

  handleSubmit = (e) => {
    e.preventDefault()

    const {
      form: {
        validateFields,
      },
      createShareholder
    } = this.props

    validateFields((err, values) => {
      if (err) return

      const shareholder = {
        name: values.name
      }

      this.setState({ isCreatingShareholder: true })

      createShareholder(shareholder)
        .then(() => {
          this.onClose()
        }).catch(err => {
          message.error('error', 2.5)
          console.error(err)
        })
    })
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue } } = this.props;

    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Añadir socio
        </Button>
        <Drawer
          title="Añadir socio"
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
          <Row gutter={16} style={{ marginTop: 12 }}>
            <Col span={12}>
              <Form.Item label="Clase de persona">
                {getFieldDecorator('personType', {
                  rules: [{ required: true, message: 'Por favor, indique la clase de persona' }]
                })(
                  <RadioGroup>
                    <Radio value='natural'>Persona física</Radio>
                    <Radio value='juridic'>Persona jurídica</Radio>
                  </RadioGroup>
                )}
              </Form.Item>
            </Col>
          </Row>
          { getFieldValue('personType') === 'juridic' &&
            <div>
              <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={12}>
                  <Form.Item label="Denominación social">
                    {getFieldDecorator('socialName', {
                       rules: [{ required: true, message: 'Por favor, escriba una denominación social' }],
                    })(<Input placeholder="Introduzca una denominación social" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="NIF">
                    {getFieldDecorator('NIF', {
                       rules: [{ required: false, message: 'Por favor, escriba un NIF' }],
                    })(<Input placeholder="Introduzca el NIF" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Domicilio social">
                    {getFieldDecorator('socialAdress', {
                       rules: [{ required: false, message: 'Por favor, escriba un domicilio social' }],
                    })(<Input placeholder="Introduzca un domicilio social" />)}
                  </Form.Item>
                </Col>
              </Row>
              <h3 style={{ marginTop: 24, marginBottom: 32 }}>Representante de la persona jurídica</h3>
            </div>
          }
          <Row gutter={16} style={{ marginTop: 24}}>
            <Col span={12}>
              <Form.Item label="Nombre">
                {getFieldDecorator('name', {
                   rules: [{ required: true, message: 'Por favor, escriba un nombre' }],
                })(<Input placeholder="Introduzca un nombre" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Primer apellido">
                {getFieldDecorator('firstSurname', {
                   rules: [{ required: false, message: 'Por favor, escriba el primer apellido' }],
                })(<Input placeholder="Introduzca el primer apellido" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Segundo apellido">
                {getFieldDecorator('secondSurname', {
                   rules: [{ required: false, message: 'Por favor, escriba el segundo apellido' }],
                })(<Input placeholder="Introduzca el segundo apellido" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 32 }}>
            <Col span={12}>
              <Form.Item label="Dirección">
                {getFieldDecorator('address', {
                   rules: [{ required: false, message: 'Por favor, escriba su dirección' }],
                })(<Input placeholder="Introduzca la dirección" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Código postal">
                {getFieldDecorator('zipCode', {
                   rules: [{ required: false, message: 'Por favor, escriba el código postal' }],
                })(<Input placeholder="Introduzca el código postal" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Provincia">
                {getFieldDecorator('province', {
                   rules: [{ required: false, message: 'Por favor, escriba la provincia' }],
                })(<Input placeholder="Introduzca la provincia" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="País">
                {getFieldDecorator('country', {
                   rules: [{ required: false, message: 'Por favor, escriba el país' }],
                })(<Input placeholder="Introduzca el país" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 32 }}>
            <Col span={12}>
              <Form.Item label="Número de teléfono">
                {getFieldDecorator('phone', {
                   rules: [{ required: false, message: 'Por favor, escriba su teléfono' }],
                })(
                   <Input
                     style={{ width: '100%' }}
                     addonBefore="+34"
                     placeholder="Introduzca su teléfono"
                   />
                 )}
              </Form.Item>
            </Col>
          </Row>

          {/*            <Row gutter={16}>
              <Col span={12}>
              <Form.Item label="Número de teléfono móvil">
              {getFieldDecorator('phone', {
              rules: [{ required: false, message: 'Por favor, escriba su teléfono' }],
              })(
              <Input
              style={{ width: '100%' }}
              addonBefore="+34"
              placeholder="Introduzca su teléfono móvil"
              />
              )}
              </Form.Item>
              </Col>
              </Row>
            */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                   rules: [{ required: false, message: 'Por favor, escriba su email' }],
                })(
                   <Input
                     style={{ width: '100%' }}
                     placeholder="Introduzca su email"
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
            <Button htmlType="submit" type="primary">Guardar</Button>
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

import React from 'react'
// antd
import {
  Drawer, Form, Button, Col, Row, Input,
  notification
} from 'antd';
// router
import { withRouter } from 'react-router'
// graphql
import { graphql, compose } from 'react-apollo'
import MutationCreateShareholder from '../../../../../../queries/MutationCreateShareholder'
import QueryGetCompany from '../../../../../../queries/QueryGetCompany'

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
      createShareholder,
      match: { params: { companyId }},
      form: {
        getFieldValue,
        validateFields
      }
    } = this.props

    validateFields((err, values) => {
      if (!err) {
        const name = getFieldValue('name')

        createShareholder(companyId, name)
          .then(res => {
            notification.success({
              message: `Shareholder creado!`,
              description: `Has creado un shareholder con un usario.`
            })
            this.onClose()
          })
      }
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
  withRouter,
  Form.create(),
  graphql(
    MutationCreateShareholder,
    {
      options: props => ({
      }),
      props: props => ({
        createShareholder: (companyId, name) =>
          props.mutate({
            variables: {
              companyId,
              name,
            },
            optimisticResponse: {
              createShareholder: {
                __typename: 'Shareholder',
                shareholderId: 'id',
                companyId,
                userId: null,
                name,
              }
            },
            update: (proxy, { data, ...rest }) => {
              const query = QueryGetCompany
              const newData = proxy.readQuery({
                query,
                variables: {
                  companyId,
                }
              })

              console.log('createShareholder', data, rest)
              newData.getCompany.shareholders.items.push(data.createShareholder)

              proxy.writeQuery({
                query,
                variables: {
                  companyId
                },
                data: newData
              })
            }
          })
      })
    }
  )
)(CreateShareholderDrawer)

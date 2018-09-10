import React from 'react'
// antd
import {
  Drawer, Form, Button, Col, Row, Input,
  notification
} from 'antd';
// graphql
import { graphql } from 'react-apollo'
import MutationCreateCompany from '../../../../queries/MutationCreateCompany'
import QueryGetUser from '../../../../queries/QueryGetUser'

class CreateCompanyDrawer extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    const { form: { validateFields, getFieldValue }, createCompany } = this.props
    validateFields((err, values) => {
      if (!err) {
        createCompany(values.name)
          .then(res => {
            notification.success({
              message: `Sociedad añadida!`,
              description: `Has guardado la sociedad: ${values.name}.`
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
          Añadir Sociedad
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
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'please enter company name' }],
                  })(<Input placeholder="please enter company name" />)}
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

export default Form.create()(graphql(
  MutationCreateCompany,
  {
    props: props => ({
      createCompany: (name) => {
        return props.mutate({
          variables: {
            name
          },
          optimisticResponse: {
            __typename: "Mutation",
            createCompany: {
              __typename: "Company",
              companyId: 'id',
              name
            }
          },
          update: (proxy, { data }) => {
            const query = QueryGetUser
            const newData = proxy.readQuery({ query, variables: { limit: null, nextToken: null } })

            // AppSync fix
            newData.getUser.companies.items[0] === null && newData.getUser.companies.items.splice(0, 1)

            newData.getUser.companies.items.push(data.createCompany)

            proxy.writeQuery({
              query,
              data: newData
            })
          }
        })
      }
    })
  }
)(CreateCompanyDrawer))

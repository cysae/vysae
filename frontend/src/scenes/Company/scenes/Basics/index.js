import React, { Component } from 'react'
// antd
import { Form, Button, Input, message } from 'antd'
// services
import getCompany from '../../../../services/getCompany'
// graphql
import { compose, graphql } from 'react-apollo'
import MutationUpdateCompany from '../../../../queries/MutationUpdateCompany'
import QueryGetCompany from '../../../../queries/QueryGetCompany'
import QueryGetUser from '../../../../queries/QueryGetUser'

const FormItem = Form.Item

class Basics extends Component {
  componentDidMount() {
    const {
      form: { setFieldsValue },
      company: { name, placeOfBusiness, nif }
    } = this.props

    setFieldsValue({
      name,
      placeOfBusiness,
      nif
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form : { validateFields }, updateCompany } = this.props
    validateFields((err, values) => {
      if (!err) {
        const hide = message.loading('Updating Company')
        updateCompany(values.name, values.placeOfBusiness, values.nif)
          .then(() => {
            hide()
            message.success('Saved', 2.5)
          })
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem
          label="Denominación social"
        >
          {getFieldDecorator('name', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="Domicilio Social"
        >
          {getFieldDecorator('placeOfBusiness', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="NIF"
        >
          {getFieldDecorator('nif', {
             rules: [{ required: true, message: 'Es obligatorio.' }],
          })(<Input />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default compose(
  graphql(MutationUpdateCompany, {
    props: props => ({
      updateCompany: (name, placeOfBusiness, nif) => {
        const companyId = props.ownProps.match.params.companyId
        console.log('mut', companyId)
        return props.mutate({
          variables: {
            companyId,
            name,
            placeOfBusiness,
            nif,
          },
          optimisticResponse: {
            updateCompany: {
              __typename: "Company",
              companyId: 'id',
              name,
              placeOfBusiness,
              nif,
            }
          },
          update: (proxy, { data }) => {
            // getCompany Query
            const newData = proxy.readQuery({
              query: QueryGetCompany,
              variables: {
                companyId
              }
            })

            newData.getCompany = {
              ...newData.getCompany,
              ...data.updateCompany
            }

            proxy.writeQuery({
              query: QueryGetCompany,
              variables: { companyId },
              data: newData
            })

            // getUser Query
            const getUserData = proxy.readQuery({
              query: QueryGetUser
            })

            for( const company of getUserData.getUser.companies.items ) {
              if( company.companyId === companyId ) {
                console.log('si')
                company.name = data.updateCompany.name
              }
            }
            proxy.writeQuery({
              query: QueryGetUser,
              data: getUserData
            })
          }
        })
      }
    })
  }),
  Form.create(),
  getCompany,
)(Basics)

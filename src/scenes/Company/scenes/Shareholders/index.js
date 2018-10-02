import React, { Fragment, Component } from 'react'
/*eslint-disable no-script-url*/
// antd
import { Table, Form, Modal, Button, message, Input } from 'antd'
// services
import getCompany from '../../../../services/getCompany'
import { compose } from 'recompose'
// components
import CreateShareholderDrawer from './components/CreateShareholderDrawer'
import ShareIntervalTable from './components/ShareIntervalTable'
// amplify
import { API } from 'aws-amplify'
const FormItem = Form.Item;

class Shareholders extends Component {
  state = {
    visible: false,
    linkShareholderId: null
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return

      console.log(this.props)
      const { match: { params: { companyId}}} = this.props
      const { linkShareholderId } = this.state

      const hideLoadingMsg = message.loading('cargando', 0)

      API.post('linkShareholder', '/linkShareholder', {
        body: { email: values.email, companyId, shareholderId: linkShareholderId }
      }).then(() => {
        hideLoadingMsg()
        message.success('invitado')
        this.closeModal()
      }).catch(err => {
        hideLoadingMsg()
        message.error('error')
        console.error(err)
      })

    });
  }

  openModal = (shareholderId) => {
    this.setState({
      visible: true,
      linkShareholderId: shareholderId
    })
  }

  closeModal = () => {
    this.setState({ visible: false })
  }

  render() {
    const {
      company: { shareholders },
      match: { params: { companyId }},
      getCompany: { createShareholder },
      form: { getFieldDecorator }
    } = this.props

    const {
      visible,
    } = this.state


    const columns = [{
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Acción',
      key: 'action',
      render: (text, record) => {
        if (!record.user)
          return (
            <button
              type="primary"
              onClick={() => this.openModal(record.id)}
            >
              Enviar invitación
            </button>
          )

        return (
          <span>está conectado</span>
        )
      }
    }];

    return (
      <Fragment>
        <CreateShareholderDrawer
          companyId={companyId}
          createShareholder={createShareholder}
        />
        <Table
          columns={columns}
          dataSource={shareholders.items}
          rowKey='id'
          expandedRowRender={(record) => <ShareIntervalTable shareholder={record} />}
        />
        <Form>
          <Modal
            visible={visible}
            title="Title"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.closeModal}>Cancelar</Button>,
              <Button key="submit" type="primary" htmlType="submit" onClick={this.handleSubmit}>
                Enviar invitacion
              </Button>
            ]}
          >
            <FormItem
              label="E-mail"
            >
              {getFieldDecorator('email', {
                 rules: [{
                   type: 'email', message: '¡El E-mail introducido no es válido!',
                 }, {
                   required: true, message: '¡Por favor, introduzca su E-mail!',
                 }],
              })(
                 <Input />
               )}
            </FormItem>
          </Modal>
        </Form>
      </Fragment>
    )
  }
}

export default compose(
  getCompany,
  Form.create()
)(Shareholders)

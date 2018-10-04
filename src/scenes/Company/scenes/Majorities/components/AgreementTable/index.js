import React, { Fragment } from 'react'
/*eslint-disable no-script-url*/
// antd
import { Table, Input, InputNumber, Popconfirm, Form, Button, Icon, message } from 'antd'
// services
import getMajority from '../../../../../../services/getMajority'
import { compose } from 'recompose'

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
           const { getFieldDecorator } = form;
           return (
             <td {...restProps}>
               {editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                       rules: [{
                         required: true,
                         message: `Por favor, introduzca ${title}!`,
                       }],
                       initialValue: record[dataIndex],
                    })(this.getInput())}
                  </FormItem>
               ) : restProps.children}
             </td>
           );
        }}
      </EditableContext.Consumer>
    );
  }
}

class AgreementTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editingId: '' };
    this.columns = [
      {
        title: 'Tipo de mayoría',
        dataIndex: 'name',
        width: '50%',
        editable: true,
      },
      {
        title: 'Operación',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                 <span>
                   <EditableContext.Consumer>
                     {form => (
                       <a
                         href="javascript:;"
                         onClick={() => this.update(form, record.id)}
                         style={{ marginRight: 8 }}
                         >
                         Actualizar
                       </a>
                     )}
                   </EditableContext.Consumer>
                   <Popconfirm
                     title="¿Seguro que quiere eliminar?"
                     onConfirm={() => this.delete(record.id)}
                     icon={<Icon type="exclamation-circle-o" style={{ color: 'red' }} />}
                   >
                     <a style={{ marginRight: 8 }}>Eliminar</a>
                   </Popconfirm>
                   <Popconfirm
                     title="¿Seguro que quiere cancelar?"
                     onConfirm={() => this.cancel(record.id)}
                     icon={<Icon type="question-circle-o" style={{ color: 'yellow' }} />}
                   >
                     <a>Cancelar</a>
                   </Popconfirm>
                 </span>
              ) : (
                 <a onClick={() => this.edit(record.id)}>Editar</a>
              )}
            </div>
          );
        },
      },
    ];
  }

  create = () => {
    const { getMajority: { createAgreement }} = this.props
    const agreement = {
      name: 'Agreement'
    }

    createAgreement(agreement)
      .then(( id ) => { this.setState({ editingId: id })})
      .catch(err => {
        message.error('error', 2.5)
        console.error(err)
      })
  }

  isEditing = (record) => {
    return record.id === this.state.editingId;
  };

  edit(id) {
    this.setState({ editingId: id });
  }

  update(form, id) {
    const { getMajority: { updateAgreement }} = this.props
    form.validateFields((error, values) => {
      if (error) return

      const agreement = {
        id,
        ...values
      }
      updateAgreement(agreement)
        .then(() => { this.setState({ editingId: null }) })
        .catch(err => {
          message.error('error')
          console.error(err)
        })
    });
  }

  cancel = () => {
    this.setState({ editingId: '' })
  };

  delete = (id) => {
    const { getMajority: { deleteAgreement }} = this.props

    deleteAgreement(id)
      .then(() => { this.setState({ editingId: null }) })
      .catch(err => {
        console.error(err)
        message.error('error')
      })
  }

  render() {
    const { majority: { agreements }} = this.props

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: false ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <Fragment>
        <Button type="primary" onClick={this.create}>Añadir acuerdo</Button>
        <Table
          components={components}
          rowKey="id"
          bordered
          dataSource={agreements.items}
          columns={columns}
          rowClassName="editable-row"
        />
      </Fragment>
    );
  }
}

export default compose(
  Form.create(),
  getMajority,
)(AgreementTable)

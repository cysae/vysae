import React, { Fragment } from 'react'
/*eslint-disable no-script-url*/
// antd
import { Table, Input, InputNumber, Popconfirm, Form, Button, Icon, message } from 'antd';
// services
import getCompany from '../../../../services/getCompany'
import { compose } from 'recompose'

function getLastShareNumber(intvls) {
  let last = 0
  for(const intvl of intvls) {
    if(last < intvl.end)
      last = intvl.end
  }
  return last
}

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
    if (this.props.inputType === 'euro') {
      return (
        <span><InputNumber /> euros (€)</span>
      )
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
                         message: `Debes introducir un valor`,
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

class Shares extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editingId: '' };
    this.columns = [
      {
        title: 'De la:',
        dataIndex: 'start',
        width: '20%',
        editable: true,
      },
      {
        title: 'a la:',
        dataIndex: 'end',
        width: '20%',
        editable: true,
      },
      {
        title: 'Valor nominal por participación',
        dataIndex: 'value',
        width: '20%',
        editable: true,
        render: (text, record) => {
          return (
            <span>{text} euros (€)</span>
          )
        }
      },
      {
        title: 'Peso del voto',
        dataIndex: 'voteWeight',
        width: '20%',
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
                 <a onClick={() => this.edit(record.id)}>Edit</a>
              )}
            </div>
          );
        },
      },
    ];
  }

  create = () => {
    const {
      company: { shareIntervals },
      getCompany: { createShareIntvl },
    } = this.props

    const lastShareNumber = getLastShareNumber(shareIntervals.items)
    const start = lastShareNumber + 1
    const shareIntvl = {
      start,
      end: start+1,
      value: 1,
      voteWeight: 1
    }
    createShareIntvl(shareIntvl)
      .then(id => {
        this.setState({ editingId: id })
      }).catch(err => {
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
    const {
      getCompany: { updateShareIntvl }
    } = this.props
    form.validateFields((error, values) => {
      if (error) return;

      const shareIntvl = {
        id,
        ...values,
      }

      const hideLoadingMsg = message.loading('Actualizando intervalo...', 0)

      updateShareIntvl(shareIntvl)
        .then(() => {
          hideLoadingMsg()
          message.success('Intervalo actualizado')
          this.setState({ editingId: null })
        })
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
    const { getCompany: { deleteShareIntvl }} = this.props

    console.log(id)
    deleteShareIntvl(id)
      .then(() => { this.setState({ editingId: null }) })
      .catch(err => {
        console.error(err)
        message.error('error')
      })
  }

  render() {
    const { company: { shareIntervals }} = this.props
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
          inputType: (col.dataIndex === 'value') ? 'euro' : 'number',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <Fragment>
        <Button type="primary" onClick={this.create}>Añadir Intervalo de Participaciones</Button>
        <Table
          components={components}
          rowKey="id"
          bordered
          dataSource={shareIntervals.items}
          columns={columns}
          rowClassName="editable-row"
        />
        <div>
          <h3>Peso del Voto:</h3>
          <ul>
            <li>0 = participaciones sin voto</li>
            <li>1 = una participación da derecho a 1 voto</li>
            <li>X = una participación da derecho a X votos</li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default compose(
  getCompany,
)(Shares)

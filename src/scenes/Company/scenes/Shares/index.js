import React, { Fragment } from 'react'
/*eslint-disable no-script-url*/
// antd
import { Table, Input, InputNumber, Popconfirm, Form, Button, Icon, message } from 'antd';
// services
import getCompany from '../../../../services/getCompany'
import { compose } from 'recompose'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import {
  DeleteCompanyShareInterval
} from '../../../../graphql/mutations'


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
                         message: `Please Input ${title}!`,
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
        title: 'start',
        dataIndex: 'start',
        width: '20%',
        editable: true,
      },
      {
        title: 'end',
        dataIndex: 'end',
        width: '20%',
        editable: true,
      },
      {
        title: 'Valor en €',
        dataIndex: 'value',
        width: '20%',
        editable: true,
      },
      {
        title: 'Peso de Voto',
        dataIndex: 'voteWeight',
        width: '20%',
        editable: true,
      },
      {
        title: 'operation',
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
                     title="Sure to delete?"
                     onConfirm={() => this.delete(record.id)}
                     icon={<Icon type="exclamation-circle-o" style={{ color: 'red' }} />}
                   >
                     <a style={{ marginRight: 8 }}>Delete</a>
                   </Popconfirm>
                   <Popconfirm
                     title="Sure to cancel?"
                     onConfirm={() => this.cancel(record.id)}
                     icon={<Icon type="question-circle-o" style={{ color: 'yellow' }} />}
                   >
                     <a>Cancel</a>
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
      match: { params: { companyId }},
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
      match: { params: { companyId}},
      getCompany: { updateShareIntvl }
    } = this.props
    form.validateFields((error, values) => {
      if (error) return;

      const shareIntvl = {
        id,
        ...values,
      }

      updateShareIntvl(shareIntvl)
        .then(res => { this.setState({ editingId: null }) })
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
    const hideLoadingMsg = message.loading('Borrando intervalo de participaciones...')
    API.graphql(graphqlOperation(gqlToString(DeleteCompanyShareInterval), { input: { id } } ))
      .then(res => { this.setState({ editingId: null }) })
      .catch(err => {
        console.error(err)
        message.error('error')
      })
      .finally(() => hideLoadingMsg())
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
          inputType: true ? 'number' : 'text',
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
      </Fragment>
    );
  }
}

export default compose(
  getCompany,
)(Shares)

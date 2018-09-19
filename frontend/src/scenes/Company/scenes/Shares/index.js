import React, { Fragment } from 'react'
// antd
import { Table, Input, InputNumber, Popconfirm, Form, Button, Icon } from 'antd';
// services
import getCompany from '../../../../services/getCompany'
// graphql
import { graphql, compose } from 'react-apollo'
import MutationCreateShareInterval from '../../../../queries/MutationCreateShareInterval'
import MutationUpdateShareInterval from '../../../../queries/MutationCreateShareInterval'
import QueryGetCompany from '../../../../queries/QueryGetCompany'


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
    this.state = { editingKey: '' };
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
                         onClick={() => this.update(form, record.key)}
                         style={{ marginRight: 8 }}
                         >
                         Actualizar
                       </a>
                     )}
                   </EditableContext.Consumer>
                   <Popconfirm
                     title="Sure to delete?"
                     onConfirm={() => this.delete(record.key)}
                     icon={<Icon type="exclamation-circle-o" style={{ color: 'red' }} />}
                   >
                     <a style={{ marginRight: 8 }}>Delete</a>
                   </Popconfirm>
                   <Popconfirm
                     title="Sure to cancel?"
                     onConfirm={() => this.cancel(record.key)}
                     icon={<Icon type="question-circle-o" style={{ color: 'yellow' }} />}
                   >
                     <a>Cancel</a>
                   </Popconfirm>
                 </span>
              ) : (
                 <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
            </div>
          );
        },
      },
    ];
  }

  create = () => {
    const {
      match: { params: { companyId}},
      company: { shareIntervals },
      createShareInterval,
    } = this.props
    console.log(shareIntervals)
    const lastShareNumber = shareIntervals.items.length !== 0 ? shareIntervals.items[shareIntervals.items.length-1].end : 0
    createShareInterval({
      companyId,
      start: lastShareNumber+1,
      end: lastShareNumber+2,
      value: 1,
      voteWeight: 1
    })
    this.setState({ editingKey: shareIntervals.items.length })
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  update(form, key) {
    const {
      createShareInterval,
      match: { params: { companyId}}
    } = this.props
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      createShareInterval({
        ...row,
        companyId
      })

      this.setState({ editingKey: '' })
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' })
  };

  delete = () => {
    /* for(const i in data) {
     *   console.log(i)
     *   if( data[i].key === this.state.editingKey) {
     *     data.splice(i, 1)
     *     break;
     *   }
     * } */
    this.setState({ editingKey: '' })
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

    const data = shareIntervals.items.map(
      (intvl) => ({
        ...intvl,
        key: `${intvl.companyId}-${intvl.start}`
      })
    )

    return (
      <Fragment>
        <Button type="primary" onClick={this.create}>Añadir Intervalo de Participaciones</Button>
        <Table
          components={components}
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
        />
      </Fragment>
    );
  }
}

export default compose(
  graphql( // create
    MutationCreateShareInterval,
    {
      props: props => ({
        createShareInterval: (shareInterval) => {
          const companyId = props.ownProps.match.params.companyId

          return props.mutate({
            variables: { shareInterval },
            optimisticResponse: {
              createShareInterval: {
                __typename: 'ShareInterval',
                ...shareInterval
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

              newData.getCompany.shareIntervals.items.push(data.createShareInterval)

              proxy.writeQuery({
                query,
                variables: { companyId },
                data: newData
              })
            }
          })
        }
      })
    }
  ),
  graphql( // update
    MutationUpdateShareInterval,
    {
      props: props => ({
        createShareInterval: (shareInterval) => {
          const companyId = props.ownProps.match.params.companyId

          return props.mutate({
            variables: { shareInterval },
            optimisticResponse: {
              createShareInterval: {
                __typename: 'ShareInterval',
                ...shareInterval
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

              for(const i in newData.getCompany.shareIntervals.items) {
                if(newData.getCompany.shareIntervals.items[i].start === data.createShareInterval.start)
                  newData.getCompany.shareIntervals.items[i] = data.createShareInterval
              }

              proxy.writeQuery({
                query,
                variables: { companyId },
                data: newData
              })
            }
          })
        }
      })
    }
  ),
  getCompany,
)(Shares)

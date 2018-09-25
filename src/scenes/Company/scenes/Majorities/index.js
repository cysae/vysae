import React, { Fragment } from 'react'
/*eslint-disable no-script-url*/
// antd
import { Table, Input, InputNumber, Popconfirm, Form, Button, Icon, message } from 'antd';
// services
import getCompany from '../../../../services/getCompany'
import { compose } from 'recompose'
// components
import AgreementTable from './components/AgreementTable'

function getLastShareNumber(intvls) {
  let last = 0
  for(const intvl of intvls) {
    if(last < intvl.end)
      last = intvl.end
  }
  return last
}

function getInputType(col) {
  if(col.dataIndex === 'relativeThreshold' || col.dataIndex === 'absoluteThreshold')
    return 'percentage'
  if(col.dataIndex === 'minimumVotes')
    return 'number'
  return 'normal'
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
    if (this.props.inputType === 'percentage')
      return (
        <InputNumber
          min={0}
          max={100}
          formatter={value => `${value}%`}
          parser={value => value.replace('%', '')}
        />
      )

    if (this.props.inputType === 'number')
      return (
        <InputNumber />
      )

    return <Input />;
  }

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
        title: 'name',
        dataIndex: 'name',
        width: '20%',
        editable: true,
      },
      {
        title: 'rel. Threshold',
        dataIndex: 'relativeThreshold',
        width: '20%',
        editable: true,
        render: (text, record) => (
          <span>{text}%</span>
        )
      },
      {
        title: 'abs. Threshold',
        dataIndex: 'absoluteThreshold',
        width: '20%',
        editable: true,
        render: (text, record) => (
          <span>{text} %</span>
        )
      },
      {
        title: 'min. Votes',
        dataIndex: 'minimumVotes',
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
      company: { majorities },
      getCompany: { createMajority }
    } = this.props

    const majority = {
      name: 'Majority',
      relativeThreshold: 50,
      absoluteThreshold: 0,
      minimumVotes: 0,
    }

    createMajority(majority)
      .then(( id ) => {
        this.setState({ editingId: id })
      })
      .catch(err => {
        message.error('error')
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
      getCompany: { updateMajority }
    } = this.props

    form.validateFields((error, values) => {
      if (error)
        return

      const majority = {
        id,
        ...values
      }
      updateMajority(majority)
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
    const { getCompany: { deleteMajority }} = this.props

    deleteMajority(id)
      .then(() => { this.setState({ editingId: null }) })
      .catch(err => {
        console.error(err)
        message.error('error')
      })
  }

  render() {
    const { company: { majorities }} = this.props
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
          inputType: getInputType(col),
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <Fragment>
        <Button type="primary" onClick={this.create}>Añadir Majoria</Button>
        <Table
          components={components}
          rowKey="id"
          bordered
          dataSource={majorities.items}
          columns={columns}
          rowClassName="editable-row"
          expandedRowRender={(record) => <AgreementTable majority={record} />}
        />
      </Fragment>
    );
  }
}

export default compose(
  getCompany,
)(Shares)

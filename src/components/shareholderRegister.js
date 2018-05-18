import React, { Component } from 'react'
import { Table, Icon, Divider } from 'antd';

const columns = [{
  title: 'Nombre',
  dataIndex: 'prename',
}, {
  title: 'Apellidos',
  dataIndex: 'surname',
}, {
  title: 'DNI',
  dataIndex: 'dni',
}, {
  title: 'telefon',
  dataIndex: 'telefon',
}, {
  title: 'email',
  dataIndex: 'email',
}];


const data = [{
  prename: 'John',
  surname: 'Brown',
  dni: 'abc',
  telefon: '695465654',
  email: 'dirkhornung91@gmail.com',
}, {
  prename: 'Jim Green',
  surname: 'Brown',
  dni: 'abc',
  telefon: '695465654',
  email: 'dirkhornung91@gmail.com',
}];

class ShareholderRegister extends Component {
  render() {
    return (
      <Table columns={columns} dataSource={data} />
    )
  }
}

export default ShareholderRegister

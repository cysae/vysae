import React, { Component, Fragment } from 'react'
import { Row, Col, Table } from 'antd'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

class MeetingResult extends Component {
  render() {
    const agreementTypes = [
      { id: 1, name: 'Aumento o reducción de capital' } ,
      { id: 2, name: 'Autorización a administradores para que se dediquen a actividad inmersa en el objecto social' } ,
      { id: 3, name: 'Autorización a administradores para que se dediquen a actividad inmersa en el objeto social' } ,
      { id: 4, name: 'Exclusión y separación de socios' } ,
      { id: 5, name: 'Cambio de domicilio' } ,
      { id: 6, name: 'Supresión o limitación del derecho de prederencia en aumentos de capital' } ,
    ]

    const columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }]

    const data = [
      {id: 0, pro: 40, contra: 24, blank: 24},
      {id: 1, pro: 30, contra: 13, blank: 22},
      {id: 2, pro: 20, contra: 98, blank: 22},
      {id: 3, pro: 27, contra: 39, blank: 20},
      {id: 4, pro: 18, contra: 48, blank: 21},
      {id: 5, pro: 23, contra: 38, blank: 25},
      {id: 6, pro: 34, contra: 43, blank: 21},
    ];

    return (
      <Fragment>
      <h1 style={{textAlign: 'center'}}>Voto pendiente</h1>
      <Row type="flex">
        <Col span={24}>
        <ResponsiveContainer width='100%' aspect={4}>
          <BarChart data={data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="id"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="pro" stackId="a" fill="#8884d8" />
            <Bar dataKey="contra" stackId="a" fill="#82ca9d" />
            <Bar dataKey="blank" stackId="a" fill="#84449d" />
          </BarChart>
        </ResponsiveContainer>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={agreementTypes} />
        </Col>
      </Row>
      </Fragment>
    )
  }
}

export default MeetingResult

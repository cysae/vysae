import React, { Component } from 'react'
import { Table, Divider, Input } from 'antd'
const Search = Input.Search

class MeetingHistory extends Component {
  render() {
    const dataSource = [{
      id: 1,
      type: 'Junta Ordinaria',
      startDate: '10/12/2018',
      endDate: '12/12/2018',
    }, {
      id: 2,
      type: 'Junta Universal',
      startDate: '10/12/2018',
      endDate: '12/12/2018',
    }];

    const columns = [{
      title: 'Tipo',
      dataIndex: 'type',
    }, {
      title: 'Fecha Inicio',
      dataIndex: 'startDate',
    }, {
      title: 'Fecha Final',
      dataIndex: 'endDate',
    }, {
      title: 'Aciones',
      key: 'action',
      render: (meeting) => {
        return (
          <span>
            <a href="javascript:;">Ver documentación</a>
            <Divider type="vertical" />
            <a href="javascript:;">Enviar</a>
          </span>
        )
      }
    }];

    return(
      <Table dataSource={dataSource} columns={columns} />
    )
  }
}

export default MeetingHistory

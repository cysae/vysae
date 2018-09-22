import React, { Fragment } from 'react'
// antd
import { Table, Badge, Menu, Dropdown, Icon } from 'antd'
// services
import getCompany from '../../../../services/getCompany'
// components
import CreateShareholderDrawer from './components/CreateShareholderDrawer'
import LinkShareholderWithUserDrawer from './components/LinkShareholderWithUserDrawer'

const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => {
    if (record.userId !== null)
      return (
        <span>is linked</span>
      )

    return (
      <span>
        <LinkShareholderWithUserDrawer shareholderId={record.shareholderId} />
      </span>
    )
  }
}];

const Shareholders = ({ company: { shareholders: { items }}}) => {
  const shareholders = items

  const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Status', key: 'state', render: () => <span><Badge status="success" />Finished</span> },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className="table-operation">
            <a href="javascript:;">Pause</a>
            <a href="javascript:;">Stop</a>
            <Dropdown overlay={menu}>
              <a href="javascript:;">
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        ),
      },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  return (
    <Fragment>
      <CreateShareholderDrawer />
      <Table
        columns={columns}
        dataSource={shareholders}
        rowKey='shareholderId'
      />
    </Fragment>
  )
}

export default getCompany(Shareholders)

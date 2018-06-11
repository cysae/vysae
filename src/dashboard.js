import React, { Component } from 'react'
import { Table } from 'antd'
// Redux
import { connect } from 'react-redux'
import { requestCompanySelection } from './actions/index.js'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [{
        key: 1,
        name: 'Endesa',
        lastBoardMeeting: 'Junta General',
        date: '2018-04-21T08:28:00+00:00',
        administrator: {
          name: 'Juan Perez',
          email: 'juanperez@gmail.com'
        }
      }, {
        key: 2,
        name: 'Endesa',
        lastBoardMeeting: 'Junta General',
        date: '2018-04-21T08:28:00+00:00',
        administrator: {
          name: 'Juan Perez',
          email: 'juanperez@gmail.com'
        }
      }]
    }
  }

  componentDidMount() {
    const companyId = '7171d409-8e7b-4096-ab6c-3145abfec561'
    this.props.requestCompanySelection(companyId)
  }

  render() {
    const { companies } = this.state;

    const columns = [{
      title: 'Nombre de la sociedad',
      dataIndex: 'name',
    }, {
      title: 'Última junta realizada',
      dataIndex: 'lastBoardMeeting',
    }, {
      title: 'Fecha',
      dataIndex: 'date',
    }, {
      title: 'Administrador',
      dataIndex: 'administrator',
      render: administrator => <a href={`mailto:${administrator.email}`}>{administrator.name}</a>
    }];

    return (
      <Table columns={columns} dataSource={companies} />
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedCompany: state.selectedCompany
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestCompanySelection: (companyId) => { dispatch(requestCompanySelection(companyId))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

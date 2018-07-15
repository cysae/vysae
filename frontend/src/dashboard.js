import React, { Component } from 'react'
import styled from 'styled-components'
import { Table } from 'antd'
// Redux
import { connect } from 'react-redux'
import {
  requestCompanySelection,
  requestMyCompanies
} from './actions/index.js'

const MyTable = styled(Table)`
  .selectedRow {
    background-color: #e7f7ff;
  }
`

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.getSelectedRow = this.getSelectedRow.bind(this)
  }

  componentDidMount() {
    /* this.props.requestMyCompanies() */
    /* const companyId = '81291d0e-ac65-44a2-b946-ff83104e4260' */
    /* this.props.requestCompanySelection(companyId) */
  }

  getSelectedRow(record, index) {
    if(record.uuid === this.props.selectedCompany.uuid) {
      return 'selectedRow'
    }
    return ''
  }

  render() {
    const { myCompanies } = this.props

    const columns = [{
      title: 'Nombre de la sociedad',
      dataIndex: 'name',
    }, {
      title: 'Acciones',
      dataIndex: 'uuid',
      render: (text, record) => (
        <a href="#" onClick={() => this.props.requestCompanySelection(record.uuid)}>
          Seleccionar
        </a>
      ),
    }];

    if(myCompanies.isLoading === true) {
      return <div>Loading...</div>
    }

    return (
      <MyTable rowClassName={this.getSelectedRow} rowKey="uuid" columns={columns} dataSource={myCompanies.companies} />
    )
  }
}

const mapStateToProps = state => {
  return {
    myCompanies: state.myCompanies,
    selectedCompany: state.selectedCompany,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestCompanySelection: (companyId) => { dispatch(requestCompanySelection(companyId))},
    requestMyCompanies: (companyId) => { dispatch(requestMyCompanies(companyId))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

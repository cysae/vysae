import React, { Component } from 'react'
import { Table } from 'antd'
// Redux
import { connect } from 'react-redux'
import {
  requestCompanySelection,
  requestMyCompanies
} from './actions/index.js'

class Dashboard extends Component {
  componentDidMount() {
    /* const companyId = '7171d409-8e7b-4096-ab6c-3145abfec561' */
    /* this.props.requestCompanySelection(companyId) */
    this.props.requestMyCompanies()
  }

  render() {
    const { myCompanies } = this.props

    const columns = [{
      title: 'Nombre de la sociedad',
      dataIndex: 'name',
    }];

    if(myCompanies.isLoading === true) {
      return <div>Loading...</div>
    }

    return (
      <Table columns={columns} dataSource={myCompanies.companies} />
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

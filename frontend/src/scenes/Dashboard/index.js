import React from 'react'
// graphql
import { graphql, compose } from 'react-apollo'
import QueryGetCompany from '../../queries/QueryGetCompany'
// services
import renderWhileLoading from '../../services/renderWhileLoading'
// components
import Loading from '../../components/Loading'

const Dashboard = (props) => {
  return (
    <div> Dashboard </div>
  )
}

export default compose(
  graphql(
    QueryGetCompany, {
      options: props => ({
        fetchPolicy: 'network-only',
        variables: {
          companyId: props.match.params.companyId
        },
      })
    }
  ),
  renderWhileLoading(Loading)
)(Dashboard)

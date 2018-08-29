import React from 'react'
// graphql
import { graphql, compose } from 'react-apollo'
import QueryGetCompany from '../../queries/QueryGetCompany'
// services
import renderWhileLoading from '../../services/renderWhileLoading'
// components
import Loading from '../../components/Loading'

const Dashboard = (props) => {
  const { company: { name } } = props
  return (
    <div>
      {name}
    </div>
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
      }),
      props: ({ data: { error, loading, getCompany } }) => ({
        loading,
        error,
        company: getCompany
      })
    }
  ),
  renderWhileLoading(Loading)
)(Dashboard)

import React from 'react'
// graphql
import { graphql, compose } from 'react-apollo'
import QueryGetCompany from '../../queries/QueryGetCompany'
// services
import renderWhileLoading from '../../services/renderWhileLoading'
import renderIfError from '../../services/renderIfError.js'
// components
import Loading from '../../components/Loading'
import Error from '../../components/Error'

const Dashboard = ({ company: { name }}) => {
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
  renderWhileLoading(Loading),
  renderIfError(Error)
)(Dashboard)

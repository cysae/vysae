import React from 'react'
import { withRouter } from 'react-router'
import { Redirect, Route } from 'react-router-dom'
// Apollo
import { compose, graphql } from 'react-apollo'
import GetSelectedCompany from './queries/getSelectedCompany'


const SelectCompanyRoute = ({ component: Component, ...rest }) => {
  if( rest.isLoading ) return <div>is loading</div>

  const needsSelectedCompany = (
    Object.keys(rest.selectedCompany).length === 0
    && rest.selectedCompany.constructor === Object
  )

  return (
    <Route
      {...rest}
      render={props =>
        needsSelectedCompany ? (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : (
          <Component {...props} selectedCompany={rest.selectedCompany} />
        )
      }
    />
  )
}

export default withRouter(compose(
  graphql(GetSelectedCompany, {
    props: ({ data: { loading, selectedCompany } }) => ({
      isSelectedCompanyLoading: loading,
      selectedCompany,
    })
  })
)(SelectCompanyRoute))

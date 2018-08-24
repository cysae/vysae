import React from 'react'
import { withRouter } from 'react-router'
import { Redirect, Route } from 'react-router-dom'
// Apollo
import { compose, graphql } from 'react-apollo'
import queryCurrentSelections from './queries/queryCurrentSelections'


const CurrentCompanyRoute = ({ component: Component, ...rest }) => {
  const { isLoading, currentCompanyId, currentShareholderId } = rest
  if( isLoading ) return <div>is loading</div>
  const needsCurrentCompanyId = ( currentCompanyId === null )

  return (
    <Route
      {...rest}
      render={props =>
        needsCurrentCompanyId ? (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : (
          <Component
            {...props}
            shareholderId={currentShareholderId}
            selectedCompanyId={currentCompanyId}
          />
        )
      }
    />
  )
}

export default withRouter(compose(
  graphql(queryCurrentSelections, {
    props: ({ data: { loading, currentSelections: { companyId } } }) => ({
      isLoading: loading,
      currentCompanyId: companyId,
    })
  })
)(CurrentCompanyRoute))
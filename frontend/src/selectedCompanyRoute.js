import React from 'react'
import { withRouter } from 'react-router'
import { Redirect, Route } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'

const SelectCompanyRoute = ({ component: Component, ...rest }) => {
  const needsSelectedCompany = (Object.keys(rest.selectedCompany).length === 0 && rest.selectedCompany.constructor === Object)
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

const mapStateToProps = state => {
  return {
    selectedCompany: state.selectedCompany
  }
}

export default withRouter(connect(mapStateToProps)(SelectCompanyRoute))

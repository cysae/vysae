import React from 'react'
import { Redirect, Route } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'

const SelectedCompanyRoute = ({ component: Component, ...rest }) => {
  console.log(rest.selectedCompany)
  const needsSelectedCompany = (Object.keys(rest.selectedCompany).length === 0 && rest.selectedCompany.constructor === Object)
  console.log(needsSelectedCompany)
  return (
    <Route
      {...rest}
      render={props =>
        needsSelectedCompany ? (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
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

export default connect(mapStateToProps)(SelectedCompanyRoute)

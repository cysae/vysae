import React, { Component } from 'react'
// graphql
import { compose, graphql } from 'react-apollo'
import QueryGetCompany from '../../../queries/QueryGetCompany'
// services
import renderWhileLoading from '../../../services/renderWhileLoading'
import renderIfError from '../../../services/renderIfError'
import { renderComponent } from 'recompose'
// components
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'

export default (WrappedComponent) => {
  return compose(
    graphql(
      QueryGetCompany, {
        options: (props) => ({
          variables: {
            companyId: props.match.params.companyId,
          },
        }),
        props: ( { data: { error, loading, getCompany }} ) => ({
          loading,
          error,
          company: getCompany,
        })
      },
    ),
    renderWhileLoading(Loading),
    renderIfError(Error),
  )(WrappedComponent)
}
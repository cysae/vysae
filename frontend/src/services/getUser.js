import React, { Component } from 'react'
// amplify
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { GetUser } from '../graphql/queries.js'
import { print as gqlToString } from 'graphql/language'
import aws_exports from '../aws-exports.js'
// recompose
import { compose } from 'recompose'
// services
import renderWhileLoading from './renderWhileLoading'
import renderIfError from './renderIfError'
// components
import Loading from '../components/Loading'
import Error from '../components/Error'
Amplify.configure(aws_exports)

const getCurrentAuthenticatedUser = (WrappedComponent) => {
  return class extends Component {
    state = {
      loading: true,
      error: null,
      userT: null,
    }

    componentDidMount() {
      Auth.currentAuthenticatedUser()
        .then(({ attributes }) => {
          const userId = attributes['custom:userId']
          return API.graphql(graphqlOperation(gqlToString(GetUser), { id: userId }))
        })
        .then(({ data: { getUser }}) => {
          this.setState({
            loading: false,
            getUser
          })
        })
        .catch(error => { this.setState({ error })})
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
}

export default (WrappedComponent) => {
  return compose(
    getCurrentAuthenticatedUser,
    renderWhileLoading(Loading),
    renderIfError(Error)
  )(WrappedComponent)
}

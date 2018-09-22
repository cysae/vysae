import React, { Component } from 'react'
// amplify
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { GetUser } from '../graphql/queries.js'
import { print as gqlToString } from 'graphql/language'
import aws_exports from '../aws-exports.js'
// recompose
import { compose } from 'recompose'
// services
import handleLoadingAndErrors from './handleLoadingAndErrors'
Amplify.configure(aws_exports)

const getCurrentUser = (WrappedComponent) => {
  return class extends Component {
    state = {
      loading: true,
      error: null,
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
    getCurrentUser,
    handleLoadingAndErrors
  )(WrappedComponent)
}

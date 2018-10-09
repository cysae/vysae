import React, { Component } from 'react'
// antd
import { message } from 'antd'
// amplify
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
import { print as gqlToString } from 'graphql/language'
import { GetUser } from '../graphql/queries.js'
import { OnCreateCompany } from '../graphql/subscriptions.js'
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
      user: null
    }

    companiesSubscription = null

    componentDidMount() {
      Auth.currentAuthenticatedUser()
        .then(({ attributes }) => {
          const userId = attributes['custom:userId']
          return API.graphql(graphqlOperation(gqlToString(GetUser), { id: userId }))
        })
        .then(({ data: { getUser }}) => {
          this.setState({
            loading: false,
            user: getUser
          })
        })
        .catch(error => { this.setState({ loading: false, error })})

      this.companiesSubscription = API.graphql(
        graphqlOperation(gqlToString(OnCreateCompany))
      ).subscribe({
        next: ({ value: { data: { onCreateCompany }}}) => {
          const newState = {
            ...this.state,
            user: {
              ...this.state.user,
              companies: {
                ...this.state.user.companies,
                items: [...this.state.user.companies.items, { company: { ...onCreateCompany }}]
              }
            }
          }
          this.setState(newState)
        },
        close: () => console.log('company create sub Done')
      })
    }

    fetchMoreCompanies = () => {
      const {
        user,
        user: { companies: { nextToken }}
      } = this.state

      if(nextToken) {
        const hideLoadingMsg = message.loading('Fetching data...')
        API.graphql(graphqlOperation(gqlToString(GetUser), { id: user.id, companiesNextToken: nextToken }))
          .then(({ data: { getUser: { companies } }}) => {
            const newState = {
              ...this.state,
              user: {
                ...this.state.user,
                companies: {
                  ...companies,
                  items: [...this.state.user.companies.items, ...companies.items ]
                }
              }
            }
            this.setState(newState)
          })
          .catch(error => { this.setState({ error })})
          .finally(() => hideLoadingMsg())
      }
    }

    componentWillUnmount() {
      this.companiesSubscription.unsubscribe()
    }

    render() {
      console.log(this.props)

      return <WrappedComponent {...this.props} {...this.state} fetchMoreCompanies={this.fetchMoreCompanies} />
    }
  }
}

export default (WrappedComponent) => {
  return compose(
    getCurrentUser,
    handleLoadingAndErrors
  )(WrappedComponent)
}

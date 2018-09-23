import React, { Component } from 'react'
// antd
import { message } from 'antd'
// amplify
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
import { print as gqlToString } from 'graphql/language'
import { GetCompany } from '../graphql/queries.js'
import { OnCreateCompanyShareInterval } from '../graphql/subscriptions.js'
// recompose
import { compose } from 'recompose'
// services
import handleLoadingAndErrors from './handleLoadingAndErrors'
// router
Amplify.configure(aws_exports)

const getCurrentCompany = (WrappedComponent) => {
  return class extends Component {
    state = {
      loading: true,
      error: null,
    }

    createCompanyShareIntervalSubscription = null

    componentDidMount() {
      const { match: { params: { companyId }}} = this.props
      API.graphql(graphqlOperation(gqlToString(GetCompany), { id: companyId }))
        .then(({ data: { getCompany }}) => {
          this.setState({
            loading: false,
            company: getCompany
          })
        })
        .catch(error => { this.setState({ error })})

      this.createCompanyShareIntervalSubscription = API.graphql(
        graphqlOperation(gqlToString(OnCreateCompanyShareInterval))
      ).subscribe({
        next: ({ value: { data: { onCreateCompanyShareInterval }}}) => {
          const newState = {
            ...this.state,
            company: {
              ...this.state.company,
              shareIntervals: {
                ...this.state.company.shareIntervals,
                items: [...this.state.company.shareIntervals.items, onCreateCompanyShareInterval],
              }
            }
          }
          this.setState(newState)
        }
      })
    }

    fetchMore = () => {
      // const {
      //   user,
      //   user: { companies: { nextToken }}
      // } = this.state

      // if(nextToken) {
      //   const hideLoadingMsg = message.loading('Fetching data...')
      //   API.graphql(graphqlOperation(gqlToString(GetUser), { id: user.id, companiesNextToken: nextToken }))
      //     .then(({ data: { getUser: { companies } }}) => {
      //       const newState = {
      //         ...this.state,
      //         user: {
      //           ...this.state.user,
      //           companies: {
      //             ...companies,
      //             items: [...this.state.user.companies.items, ...companies.items ]
      //           }
      //         }
      //       }
      //       this.setState(newState)
      //     })
      //     .catch(error => { this.setState({ error })})
      //     .finally(() => hideLoadingMsg())
      // }
    }

    componentWillUnmount() {
      this.createCompanyShareIntervalSubscription.unsubscribe()
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} fetchMore={this.fetchMore} />
    }
  }
}

export default (WrappedComponent) => {
  return compose(
    getCurrentCompany,
    handleLoadingAndErrors
  )(WrappedComponent)
}

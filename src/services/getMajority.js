import React, { Component } from 'react'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetMajority } from '../graphql/queries.js'
import {
  OnCreateMajorityAgreement,
  OnUpdateMajorityAgreement,
  OnDeleteMajorityAgreement,
} from '../graphql/subscriptions.js'
// recompose
import { compose } from 'recompose'
// services
import handleLoadingAndErrors from './handleLoadingAndErrors'

const getCurrentMajority = (WrappedComponent) => {
  return class extends Component {
    state = {
      loading: true,
      error: null,
    }

    // ShareIntervals
    createMajorityAgreementSubscription = null
    updateMajorityAgreementSubscription = null
    deleteMajorityAgreementSubscription = null

    componentDidMount() {
      const { majority } = this.props
      API.graphql(graphqlOperation(gqlToString(GetMajority), { id: majority.id }))
        .then(({ data: { getMajority }}) => {
          this.setState({
            loading: false,
            majority: getMajority
          })
        })
        .catch(error => { this.setState({ loading: false, error })})

      this.handleSubscriptions()
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

    handleSubscriptions = () => {
      //create majority agreemeent subscription
      this.createMajorityAgreementSubscription = API.graphql(
        graphqlOperation(gqlToString(OnCreateMajorityAgreement))
      ).subscribe({
        next: ({ value: { data: { onCreateMajorityAgreement }}}) => {
          const newState = {
            ...this.state,
            majority: {
              ...this.state.majority,
              agreements: {
                ...this.state.majority.agreements,
                items: [...this.state.majority.agreements.items, onCreateMajorityAgreement],
              }
            }
          }
          this.setState(newState)
        }
      })

      /* update shareinterval subscription */
      this.updateMajorityAgreementSubscription = API.graphql(
        graphqlOperation(gqlToString(OnUpdateMajorityAgreement))
      ).subscribe({
        next: ({ value: { data: { onUpdateMajorityAgreement }}}) => {
          const newState = {
            majority: {
              ...this.state.majority,
              agreements: {
                ...this.state.majority.agreements,
                items: this.state.majority.agreements.items.map(agreement => {
                  if(agreement.id === onUpdateMajorityAgreement.id)
                    agreement = onUpdateMajorityAgreement
                  return agreement
                }),
              }
            }
          }
          this.setState(newState)
        }
      })

      // delete shareinterval subscription
      this.deleteMajorityAgreementSubscription = API.graphql(
        graphqlOperation(gqlToString(OnDeleteMajorityAgreement))
      ).subscribe({
        next: ({ value: { data: { onDeleteMajorityAgreement }}}) => {
          const newState = {
            ...this.state,
            majority: {
              ...this.state.majority,
              agreements: {
                ...this.state.majority.agreements,
                items: this.state.majority.agreements.items.filter(agreement => {
                  return agreement.id !== onDeleteMajorityAgreement.id
                }),
              }
            }
          }
          this.setState(newState)
        }
      })
    }


    componentWillUnmount() {
      this.createMajorityAgreementSubscription.unsubscribe()
      this.updateMajorityAgreementSubscription.unsubscribe()
      this.deleteMajorityAgreementSubscription.unsubscribe()
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} fetchMore={this.fetchMore} />
    }
  }
}

export default (WrappedComponent) => {
  return compose(
    getCurrentMajority,
    handleLoadingAndErrors
  )(WrappedComponent)
}

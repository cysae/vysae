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
      /* this.updateShareholderShareIntervalSubscription = API.graphql(
       *   graphqlOperation(gqlToString(OnUpdateShareholderShareInterval))
       * ).subscribe({
       *   next: ({ value: { data: { onUpdateShareholderShareInterval }}}) => {
       *     const newState = {
       *       ...this.state,
       *       shareholder: {
       *         ...this.state.shareholder,
       *         shareIntervals: {
       *           ...this.state.shareholder.shareIntervals,
       *           items: this.state.shareholder.shareIntervals.items.map(shareInterval => {
       *             if(shareInterval.id === onUpdateShareholderShareInterval.id)
       *               shareInterval = onUpdateShareholderShareInterval
       *             return shareInterval
       *           }),
       *         }
       *       }
       *     }
       *     this.setState(newState)
       *   }
       * }) */

      // delete shareinterval subscription
      /* this.deleteCompanyShareIntervalSubscription = API.graphql(
       *   graphqlOperation(gqlToString(OnDeleteShareholderShareInterval))
       * ).subscribe({
       *   next: ({ value: { data: { onDeleteShareholderShareInterval }}}) => {
       *     const newState = {
       *       ...this.state,
       *       shareholder: {
       *         ...this.state.shareholder,
       *         shareIntervals: {
       *           ...this.state.shareholder.shareIntervals,
       *           items: this.state.shareholder.shareIntervals.items.filter(shareInterval => {
       *             return shareInterval.id !== onDeleteShareholderShareInterval.id
       *           }),
       *         }
       *       }
       *     }
       *     this.setState(newState)
       *   }
       * }) */
    }


    componentWillUnmount() {
      this.createMajorityAgreementSubscription.unsubscribe()
      /* this.updateMajorityAgreementSubscription.unsubscribe()
       * this.deleteMajorityAgreementSubscription.unsubscribe() */
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

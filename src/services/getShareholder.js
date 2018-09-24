import React, { Component } from 'react'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetShareholder } from '../graphql/queries.js'
import {
  OnCreateShareholderShareInterval,
  OnUpdateShareholderShareInterval,
  OnDeleteShareholderShareInterval,
} from '../graphql/subscriptions.js'
// recompose
import { compose } from 'recompose'
// services
import handleLoadingAndErrors from './handleLoadingAndErrors'

const getCurrentCompany = (WrappedComponent) => {
  return class extends Component {
    state = {
      loading: true,
      error: null,
    }

    // ShareIntervals
    createShareholderShareIntervalSubscription = null
    updateShareholderShareIntervalSubscription = null
    deleteShareholderShareIntervalSubscription = null

    componentDidMount() {
      const { shareholder } = this.props
      console.log('test', shareholder)
      API.graphql(graphqlOperation(gqlToString(GetShareholder), { id: shareholder.id }))
        .then(({ data: { getShareholder }}) => {
          console.log('getShareholder', getShareholder)
          this.setState({
            loading: false,
            shareholder: getShareholder
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
      // create shareinterval subscription
      this.createShareholderShareIntervalSubscription = API.graphql(
        graphqlOperation(gqlToString(OnCreateShareholderShareInterval))
      ).subscribe({
        next: ({ value: { data: { onCreateShareholderShareInterval }}}) => {
          const newState = {
            ...this.state,
            shareholder: {
              ...this.state.shareholder,
              shareIntervals: {
                ...this.state.shareholder.shareIntervals,
                items: [...this.state.shareholder.shareIntervals.items, onCreateShareholderShareInterval],
              }
            }
          }
          this.setState(newState)
        }
      })

        /* update shareinterval subscription */
        this.updateShareholderShareIntervalSubscription = API.graphql(
          graphqlOperation(gqlToString(OnUpdateShareholderShareInterval))
        ).subscribe({
          next: ({ value: { data: { onUpdateShareholderShareInterval }}}) => {
            const newState = {
              ...this.state,
              shareholder: {
                ...this.state.shareholder,
                shareIntervals: {
                  ...this.state.shareholder.shareIntervals,
                  items: this.state.shareholder.shareIntervals.items.map(shareInterval => {
                    if(shareInterval.id === onUpdateShareholderShareInterval.id)
                      shareInterval = onUpdateShareholderShareInterval
                    return shareInterval
                  }),
                }
              }
            }
            this.setState(newState)
          }
        })

      // delete shareinterval subscription
      this.deleteCompanyShareIntervalSubscription = API.graphql(
        graphqlOperation(gqlToString(OnDeleteShareholderShareInterval))
      ).subscribe({
        next: ({ value: { data: { onDeleteShareholderShareInterval }}}) => {
          const newState = {
            ...this.state,
            shareholder: {
              ...this.state.shareholder,
              shareIntervals: {
                ...this.state.shareholder.shareIntervals,
                items: this.state.shareholder.shareIntervals.items.filter(shareInterval => {
                  return shareInterval.id !== onDeleteShareholderShareInterval.id
                }),
              }
            }
          }
          this.setState(newState)
        }
      })
    }


    componentWillUnmount() {
      this.createShareholderShareIntervalSubscription.unsubscribe()
      this.updateShareholderShareIntervalSubscription.unsubscribe()
      this.deleteShareholderShareIntervalSubscription.unsubscribe()
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} fetchMore={this.fetchMore} />
    }
  }
}

export default (WrappedComponent) => {
  return compose(
    getCurrentCompany,
    handleLoadingAndErrors
  )(WrappedComponent)
}

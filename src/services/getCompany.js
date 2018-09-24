import React, { Component } from 'react'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetCompany } from '../graphql/queries.js'
import {
  OnCreateCompanyShareInterval,
  OnUpdateCompanyShareInterval,
  OnDeleteCompanyShareInterval,
  OnCreateShareholder,
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

    // Company
    createCompanyShareIntervalSubscription = null
    updateCompanyShareIntervalSubscription = null
    deleteCompanyShareIntervalSubscription = null

    // Shareholder
    createShareholderSubscription = null
    /* updateShareholderSubscription = null
     * deleteShareholderSubscription = null */


    componentDidMount() {
      const { match: { params: { companyId }}} = this.props
      API.graphql(graphqlOperation(gqlToString(GetCompany), { id: companyId }))
        .then(({ data: { getCompany }}) => {
          this.setState({
            loading: false,
            company: getCompany
          })
        })
        .catch(error => { this.setState({ loading: false, error })})

      this.handleCompanySubscriptions()
      this.handleShareholderSubscriptions()
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

    handleCompanySubscriptions = () => {
      // create shareinterval subscription
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

      // update shareinterval subscription
      this.updateCompanyShareIntervalSubscription = API.graphql(
        graphqlOperation(gqlToString(OnUpdateCompanyShareInterval))
      ).subscribe({
        next: ({ value: { data: { onUpdateCompanyShareInterval }}}) => {
          const newState = {
            ...this.state,
            company: {
              ...this.state.company,
              shareIntervals: {
                ...this.state.company.shareIntervals,
                items: this.state.company.shareIntervals.items.map(shareInterval => {
                  if(shareInterval.id === onUpdateCompanyShareInterval.id)
                    shareInterval = onUpdateCompanyShareInterval
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
        graphqlOperation(gqlToString(OnDeleteCompanyShareInterval))
      ).subscribe({
        next: ({ value: { data: { onDeleteCompanyShareInterval }}}) => {
          const newState = {
            ...this.state,
            company: {
              ...this.state.company,
              shareIntervals: {
                ...this.state.company.shareIntervals,
                items: this.state.company.shareIntervals.items.filter(shareInterval => {
                  return shareInterval.id !== onDeleteCompanyShareInterval.id
                }),
              }
            }
          }
          this.setState(newState)
        }
      })
    }

    handleShareholderSubscriptions = () => {
      // create shareinterval subscription
      this.createShareholderSubscription = API.graphql(
        graphqlOperation(gqlToString(OnCreateShareholder))
      ).subscribe({
        next: ({ value: { data: { onCreateShareholder }}}) => {
          const newState = {
            ...this.state,
            company: {
              ...this.state.company,
              shareholders: {
                ...this.state.company.shareholders,
                items: [...this.state.company.shareholders.items, onCreateShareholder],
              }
            }
          }
          this.setState(newState)
        }
      })

      // update shareinterval subscription
      /* this.updateCompanyShareIntervalSubscription = API.graphql(
       *   graphqlOperation(gqlToString(OnUpdateCompanyShareInterval))
       * ).subscribe({
       *   next: ({ value: { data: { onUpdateCompanyShareInterval }}}) => {
       *     const newState = {
       *       ...this.state,
       *       company: {
       *         ...this.state.company,
       *         shareIntervals: {
       *           ...this.state.company.shareIntervals,
       *           items: this.state.company.shareIntervals.items.map(shareInterval => {
       *             if(shareInterval.id === onUpdateCompanyShareInterval.id)
       *               shareInterval = onUpdateCompanyShareInterval
       *             return shareInterval
       *           }),
       *         }
       *       }
       *     }
       *     this.setState(newState)
       *   }
       * })

       * // delete shareinterval subscription
       * this.deleteCompanyShareIntervalSubscription = API.graphql(
       *   graphqlOperation(gqlToString(OnDeleteCompanyShareInterval))
       * ).subscribe({
       *   next: ({ value: { data: { onDeleteCompanyShareInterval }}}) => {
       *     const newState = {
       *       ...this.state,
       *       company: {
       *         ...this.state.company,
       *         shareIntervals: {
       *           ...this.state.company.shareIntervals,
       *           items: this.state.company.shareIntervals.items.filter(shareInterval => {
       *             return shareInterval.id !== onDeleteCompanyShareInterval.id
       *           }),
       *         }
       *       }
       *     }
       *     this.setState(newState)
       *   }
       * }) */
    }

    componentWillUnmount() {
      this.createCompanyShareIntervalSubscription.unsubscribe()
      this.updateCompanyShareIntervalSubscription.unsubscribe()
      this.deleteCompanyShareIntervalSubscription.unsubscribe()
      this.createShareholderSubscription.unsubscribe()
      /* this.updateShareholderSubscription.unsubscribe()
       * this.deleteShareholderSubscription.unsubscribe() */
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
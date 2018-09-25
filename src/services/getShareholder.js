import React, { Component } from 'react'
// antd
import { message } from 'antd'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetShareholder } from '../graphql/queries'
import {
  OnCreateShareholderShareInterval,
  OnUpdateShareholderShareInterval,
  OnDeleteShareholderShareInterval,
} from '../graphql/subscriptions.js'
import {
  CreateShareholderShareInterval,
  UpdateShareholderShareInterval,
  DeleteShareholderShareInterval
} from '../graphql/mutations'
// recompose
import { compose } from 'recompose'
// services
import handleLoadingAndErrors from './handleLoadingAndErrors'

const getCurrentShareholder = (WrappedComponent) => {
  return class extends Component {
    state = {
      loading: true,
      error: null,
    }

    componentDidMount() {
      const { shareholder } = this.props

      API.graphql(graphqlOperation(gqlToString(GetShareholder), { id: shareholder.id }))
        .then(({ data: { getShareholder }}) => {
          this.setState({
            loading: false,
            shareholder: getShareholder
          })
        })
        .catch(error => { this.setState({ loading: false, error })})
    }

    fetchMore = () => {}

    createShareIntvl = (shareIntvl) => {
      const { shareholder } = this.props
      const hideLoadingMsg = message.loading('Creando intervalo de participaciones...')

      return API.graphql(graphqlOperation(gqlToString(CreateShareholderShareInterval), {
        input: {
          shareholderShareIntervalShareholderId: shareholder.id,
          ...shareIntvl,
        }
      }))
        .then(({ data: { createShareholderShareInterval }}) => {
          const newState = {
            ...this.state,
            shareholder: {
              ...this.state.shareholder,
              shareIntervals: {
                ...this.state.shareholder.shareIntervals,
                items: [...this.state.shareholder.shareIntervals.items, createShareholderShareInterval],
              }
            }
          }
          this.setState(newState)
          return createShareholderShareInterval.id
        }).finally(() => hideLoadingMsg())
    }

    updateShareIntvl = (shareIntvl) => {
      const { shareholder } = this.props
      const hideLoadingMsg = message.loading('Creando intervalo de participaciones...')

      return API.graphql(graphqlOperation(gqlToString(UpdateShareholderShareInterval), {
        input: {
          shareholderShareIntervalShareholderId: shareholder.id,
          ...shareIntvl,
        }
      }))
        .then(({ data: { updateShareholderShareInterval }}) => {
          const newState = {
            ...this.state,
            shareholder: {
              ...this.state.shareholder,
              shareIntervals: {
                ...this.state.shareholder.shareIntervals,
                items: this.state.shareholder.shareIntervals.items.map(shareInterval => {
                  if(shareInterval.id === updateShareholderShareInterval.id)
                    shareInterval = updateShareholderShareInterval
                  return shareInterval
                }),
              }
            }
          }
          this.setState(newState)
        }).finally(() => hideLoadingMsg())
    }

    getShareholder = () => ({
      createShareIntvl: this.createShareIntvl,
      updateShareIntvl: this.updateShareIntvl,
      deleteShareIntvl: this.deleteShareIntvl
    })

    handleSubscriptions = () => {
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

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          fetchMore={this.fetchMore}
          getShareholder={this.getShareholder()}
        />
      )
    }
  }
}

export default (WrappedComponent) => {
  return compose(
    getCurrentShareholder,
    handleLoadingAndErrors
  )(WrappedComponent)
}

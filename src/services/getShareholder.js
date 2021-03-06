import React, { Component } from 'react'
// antd
import { message } from 'antd'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetShareholder } from '../graphql/queries'
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

    componentDidMount = async() => {
      const { shareholder } = this.props

      try {
        const { data: { getShareholder }} = await API.graphql(
          graphqlOperation(gqlToString(GetShareholder), { id: shareholder.id })
        )

        // query ALL shareIntvls of the Shareholder
        let nextToken = getShareholder.shareIntervals.nextToken
        const shareIntvlItems = getShareholder.shareIntervals.items
        while(nextToken) {
          const { data: { getShareholder: { shareIntervals }}} = await API.graphql(
            graphqlOperation(gqlToString(GetShareholder), {
              id: shareholder.id,
              shareIntvlsNextToken: nextToken
            })
          )
          shareIntvlItems.push(...shareIntervals.items)
          nextToken = shareIntervals.nextToken
        }

        getShareholder.shareIntervals.items = shareIntvlItems

        this.setState({
          loading: false,
          shareholder: getShareholder
        })
      }
      catch(error) {
        this.setState({ loading: false, error })
      }
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
      const hideLoadingMsg = message.loading('Actualizando intervalo de participaciones...')

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

    deleteShareIntvl = (id) => {
      const hideLoadingMsg = message.loading('Borrando intervalo de participaciones...')

      return API.graphql(graphqlOperation(gqlToString(DeleteShareholderShareInterval), {
        input: { id }
      }))
        .then(({ data: { deleteShareholderShareInterval }}) => {
          const newState = {
            ...this.state,
            shareholder: {
              ...this.state.shareholder,
              shareIntervals: {
                ...this.state.shareholder.shareIntervals,
                items: this.state.shareholder.shareIntervals.items.filter(shareInterval => {
                  return shareInterval.id !== deleteShareholderShareInterval.id
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

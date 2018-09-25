import React, { Component } from 'react'
// antd
import { message } from 'antd'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetMajority } from '../graphql/queries'
import {
  OnCreateMajorityAgreement,
  OnUpdateMajorityAgreement,
  OnDeleteMajorityAgreement,
} from '../graphql/subscriptions.js'
import {
  CreateMajorityAgreement,
  UpdateMajorityAgreement,
  DeleteMajorityAgreement
} from '../graphql/mutations'
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

    getMajority = () => ({
      createAgreement: this.createAgreement
    })

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
    }

    fetchMore = () => {}

    createAgreement = (agreement) => {
      const { majority } = this.props
      const hideLoadingMsg = message.loading('Creando acuerdos...')

      return API.graphql(graphqlOperation(gqlToString(CreateMajorityAgreement), {
        input: {
          majorityAgreementMajorityId: majority.id,
          ...agreement,
        }
      }))
        .then(({ data: { createMajorityAgreement }}) => {
          const newState = {
            ...this.state,
            majority: {
              ...this.state.majority,
              agreements: {
                ...this.state.majority.agreements,
                items: [...this.state.majority.agreements.items, createMajorityAgreement],
              }
            }
          }
          this.setState(newState)
          return createMajorityAgreement.id
        }).finally(() => hideLoadingMsg())
    }

    handleSubscriptions = () => {
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

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          fetchMore={this.fetchMore}
          getMajority={this.getMajority()}
        />
      )
    }
  }
}

export default (WrappedComponent) => {
  return compose(
    getCurrentMajority,
    handleLoadingAndErrors
  )(WrappedComponent)
}

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
      createAgreement: this.createAgreement,
      updateAgreement: this.updateAgreement,
      deleteAgreement: this.deleteAgreement,
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
      const hideLoadingMsg = message.loading('Creando acuerdo...')

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

    updateAgreement = (agreement) => {
      const { majority } = this.props
      const hideLoadingMsg = message.loading('Actualizando acuerdo...')

      return API.graphql(graphqlOperation(gqlToString(UpdateMajorityAgreement), {
        input: {
          majorityAgreementMajorityId: majority.id,
          ...agreement,
        }
      }))
        .then(({ data: { updateMajorityAgreement }}) => {
          const newState = {
            majority: {
              ...this.state.majority,
              agreements: {
                ...this.state.majority.agreements,
                items: this.state.majority.agreements.items.map(agreement => {
                  if(agreement.id === updateMajorityAgreement.id)
                    agreement = updateMajorityAgreement
                  return agreement
                }),
              }
            }
          }
          this.setState(newState)
        }).finally(() => hideLoadingMsg())
    }

    deleteAgreement = (id) => {
      const { majority } = this.props
      const hideLoadingMsg = message.loading('Borrando acuerdo...')

      return API.graphql(graphqlOperation(gqlToString(DeleteMajorityAgreement), {
        input: { id }
      }))
        .then(({ data: { deleteMajorityAgreement }}) => {
          const newState = {
            ...this.state,
            majority: {
              ...this.state.majority,
              agreements: {
                ...this.state.majority.agreements,
                items: this.state.majority.agreements.items.filter(agreement => {
                  return agreement.id !== deleteMajorityAgreement.id
                }),
              }
            }
          }
          this.setState(newState)
        }).finally(() => hideLoadingMsg())
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

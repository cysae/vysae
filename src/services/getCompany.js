import React, { Component } from 'react'
//antd
import { message } from 'antd'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetCompany } from '../graphql/queries'
import {
  OnCreateCompanyShareInterval,
  OnUpdateCompanyShareInterval,
  OnDeleteCompanyShareInterval,
  OnCreateShareholder,
  OnCreateMajority,
  OnUpdateMajority,
  OnDeleteMajority,
} from '../graphql/subscriptions'
import {
  CreateShareholder,
  CreateCompanyShareInterval,
  UpdateCompanyShareInterval,
  DeleteCompanyShareInterval,
  CreateMajority,
  UpdateMajority,
  DeleteMajority,
} from '../graphql/mutations'
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
    }

    fetchMore = () => {}

    createShareholder = (shareholder) => {
      const { match: { params: { companyId }}} = this.props
      const hideLoadingMsg = message.loading('Creando socio...')

      return API.graphql(graphqlOperation(gqlToString(CreateShareholder), {
        input: {
          shareholderCompanyId: companyId,
          ...shareholder,
        }
      }))
        .then(({ data: { createShareholder }}) => {
          const newState = {
            ...this.state,
            company: {
              ...this.state.company,
              shareholders: {
                ...this.state.company.shareholders,
                items: [...this.state.company.shareholders.items, createShareholder]
              }
            }
          }
          this.setState(newState)
        }).finally(() => hideLoadingMsg())
    }

    createShareIntvl = (shareIntvl) => {
      const { match: { params: { companyId }}} = this.props
      const hideLoadingMsg = message.loading('Creando intervalo de participaciones...')

      return API.graphql(
        graphqlOperation(gqlToString(CreateCompanyShareInterval), {
          input: {
            companyShareIntervalCompanyId: companyId,
            ...shareIntvl
          }
        })
      ).then(({ data: { createCompanyShareInterval }}) => {
        const newState = {
          ...this.state,
          company: {
            ...this.state.company,
            shareIntervals: {
              ...this.state.company.shareIntervals,
              items: [...this.state.company.shareIntervals.items, createCompanyShareInterval]
            }
          }
        }
        this.setState(newState)
        return createCompanyShareInterval.id
      }).finally(() => hideLoadingMsg())
    }

    updateShareIntvl = (shareIntvl) => {
      const { match: { params: { companyId }}} = this.props
      const hideLoadingMsg = message.loading('Actualizando intervalo de participaciones...')

      return API.graphql(
        graphqlOperation(gqlToString(UpdateCompanyShareInterval), {
          input: {
            companyShareIntervalCompanyId: companyId,
            ...shareIntvl
          }
        })
      ).then(({ data: { updateCompanyShareInterval }}) => {
        const newState = {
          ...this.state,
          company: {
            ...this.state.company,
            shareIntervals: {
              ...this.state.company.shareIntervals,
              items: this.state.company.shareIntervals.items.map(shareInterval => {
                if(shareInterval.id === updateCompanyShareInterval.id)
                  shareInterval = updateCompanyShareInterval
                return shareInterval
              }),
            }
          }
        }
        this.setState(newState)
      }).finally(() => hideLoadingMsg())
    }

    deleteShareIntvl = (id) => {
      const { match: { params: { companyId }}} = this.props
      const hideLoadingMsg = message.loading('Borrando intervalo de participaciones...')

      return API.graphql(
        graphqlOperation(gqlToString(DeleteCompanyShareInterval), {
          input: { id }
        })
      ).then(({ data: { deleteCompanyShareInterval }}) => {
        const newState = {
          ...this.state,
          company: {
            ...this.state.company,
            shareIntervals: {
              ...this.state.company.shareIntervals,
              items: this.state.company.shareIntervals.items.filter(shareInterval => {
                return shareInterval.id !== deleteCompanyShareInterval.id
              }),
            }
          }
        }
        this.setState(newState)
      }).finally(() => hideLoadingMsg())
    }

    createMajority = (majority) => {
      const { match: { params: { companyId }}} = this.props
      const hideLoadingMsg = message.loading('Creando majoria...')

      return API.graphql(
        graphqlOperation(gqlToString(CreateMajority), {
          input: {
            majorityCompanyId: companyId,
            ...majority
          }
        })
      ).then(({ data: { createMajority }}) => {
        const newState = {
          ...this.state,
          company: {
            ...this.state.company,
            majorities: {
              ...this.state.company.majorities,
              items: [...this.state.company.majorities.items, createMajority],
            }
          }
        }
        this.setState(newState)
        return createMajority.id
      }).finally(() => hideLoadingMsg())
    }

    updateMajority = (majority) => {
      const { match: { params: { companyId }}} = this.props
      const hideLoadingMsg = message.loading('Creando majoria...')

      return API.graphql(
        graphqlOperation(gqlToString(UpdateMajority), {
          input: {
            majorityCompanyId: companyId,
            ...majority
          }
        })
      ).then(({ data: { updateMajority }}) => {
        const newState = {
          ...this.state,
          company: {
            ...this.state.company,
            majorities: {
              ...this.state.company.majorities,
              items: this.state.company.majorities.items.map(majority => {
                if(majority.id === updateMajority.id)
                  majority = updateMajority
                return majority
              }),
            }
          }
        }
        this.setState(newState)
      }).finally(() => hideLoadingMsg())
    }

    getCompany = () => ({
      createShareholder: this.createShareholder,
      createShareIntvl: this.createShareIntvl,
      updateShareIntvl: this.updateShareIntvl,
      deleteShareIntvl: this.deleteShareIntvl,
      createMajority: this.createMajority,
      updateMajority: this.updateMajority,
      deleteMajority: this.deleteMajority,
    })

    handleMajoritySubscriptions = () => {
      // update shareinterval subscription
      this.updateMajoritySubscription = API.graphql(
        graphqlOperation(gqlToString(OnUpdateMajority))
      ).subscribe({
        next: ({ value: { data: { onUpdateMajority }}}) => {
        }
      })

      // delete shareinterval subscription
      this.deleteMajoritySubscription = API.graphql(
        graphqlOperation(gqlToString(OnDeleteMajority))
      ).subscribe({
        next: ({ value: { data: { onDeleteMajority }}}) => {
          const newState = {
            ...this.state,
            company: {
              ...this.state.company,
              majorities: {
                ...this.state.company.majorities,
                items: this.state.company.majorities.items.filter(majority => {
                  return majority.id !== onDeleteMajority.id
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
          getCompany={this.getCompany()}
        />
      )
    }
  }
}

export default (WrappedComponent) => {
  return compose(
    getCurrentCompany,
    handleLoadingAndErrors
  )(WrappedComponent)
}

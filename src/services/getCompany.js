import React, { Component } from 'react'
//antd
import { message } from 'antd'
// amplify
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetCompany } from '../graphql/queries'
import {
  CreateShareholder,
  UpdateShareholder,
  CreateUser,
  DeleteUser,
  CreateCompanyShareInterval,
  UpdateCompanyShareInterval,
  DeleteCompanyShareInterval,
  CreateMajority,
  UpdateMajority,
  DeleteMajority,
  CreateMeeting,
  CreateMeetingAgreement,
} from '../graphql/mutations'
// recompose
import { compose } from 'recompose'
// services
import handleLoadingAndErrors from './handleLoadingAndErrors'
import Promises from 'bluebird'
import generator from 'generate-password'

const getCurrentCompany = (WrappedComponent) => {
  return class extends Component {
    state = {
      loading: true,
      error: null,
    }

    getCompany = () => ({
      createShareholder: this.createShareholder,
      linkShareholder: this.linkShareholder,
      createShareIntvl: this.createShareIntvl,
      updateShareIntvl: this.updateShareIntvl,
      deleteShareIntvl: this.deleteShareIntvl,
      createMajority: this.createMajority,
      updateMajority: this.updateMajority,
      deleteMajority: this.deleteMajority,
      createMeeting: this.createMeeting,
    })

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

    linkShareholder = (shareholder, user) => {
      const { match: { params: { companyId }}} = this.props
      let userId

      return API.graphql(graphqlOperation(gqlToString(CreateUser), {
        input: { name: user.name }
      })).then(({ data: { createUser }}) => {
        const password = generator.generate({ length: 8, numbers: true, symbols: true, strict: true })
        userId = createUser.id

        return Promises.all([
          createUser.id,
          Auth.signUp({
            username: user.username,
            password,
            attributes: {
              email: user.email,          // optional
              phone_number: '+34'+user.phone_number,   // optional - E.164 number convention
              ['custom:userId']: createUser.id,
            },
            validationData: []  //optional
          }),
          API.graphql(graphqlOperation(gqlToString(UpdateShareholder), {
            input: {
              shareholderCompanyId: companyId,
              shareholderUserId: createUser.id,
              ...shareholder
            }
          }))
        ])
      }).catch(err => {
        console.log(userId)
        return API.graphql(graphqlOperation(gqlToString(DeleteUser), {
          input: { id: userId }
        })).then(() => {
          throw err
        })
      })
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
      const hideLoadingMsg = message.loading('Actualizando majoria...')

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

    deleteMajority = (id) => {
      const hideLoadingMsg = message.loading('Borrando majoria...')

      return API.graphql(
        graphqlOperation(gqlToString(DeleteMajority), {
          input: { id }
        })
      ).then(({ data: { deleteMajority }}) => {
        const newState = {
          ...this.state,
          company: {
            ...this.state.company,
            majorities: {
              ...this.state.company.majorities,
              items: this.state.company.majorities.items.filter(majority => {
                return majority.id !== deleteMajority.id
              }),
            }
          }
        }
        this.setState(newState)
      }).finally(() => hideLoadingMsg())
    }

    createMeeting = (meeting, agreements) => {
      const { match: { params: { companyId }}} = this.props
      const hideLoadingMsg = message.loading('Creando intervalo de participaciones...')

      return API.graphql(graphqlOperation(gqlToString(CreateMeeting), {
        input: { meetingCompanyId: companyId, ...meeting }
      })).then(({ data: { createMeeting }}) => {
        const newState = {
          ...this.state,
          company: {
            ...this.state.company,
            meetings: {
              ...this.state.company.meetings,
              items: [...this.state.company.meetings.items, createMeeting],
            }
          }
        }
        this.setState(newState)

        const promises = agreements.map((agreement) => {
          return API.graphql(graphqlOperation(gqlToString(CreateMeetingAgreement), {
            input: {
              meetingAgreementMeetingId: createMeeting.id,
              ...agreement
            }
          }))
        })
        return Promise.all(promises)
      }).finally(() => hideLoadingMsg())
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

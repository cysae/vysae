import React, { Component } from 'react'
// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetMeeting } from '../graphql/queries'
// recompose
import { compose } from 'recompose'
// services
import handleLoadingAndErrors from './handleLoadingAndErrors'

const getCurrentMeeting = (WrappedComponent) => {
  return class extends Component {
    state = {
      loading: true,
      error: null,
    }

    getMeeting = () => ({})

    componentDidMount = async () => {
      const { match: { params: { meetingId }}} = this.props
      try {
        const { data: { getMeeting }} = await API.graphql(
          graphqlOperation(gqlToString(GetMeeting), { id: meetingId })
        )

        // query ALL agreements
        let nextToken = getMeeting.agreements.nextToken
        const agreementItems = getMeeting.agreements.items
        while(nextToken) {
          const { data: { getMeeting: { agreements }}} = await API.graphql(
            graphqlOperation(gqlToString(GetMeeting), {
              id: meetingId,
              agreementNextToken: nextToken
            })
          )
          agreementItems.push(...agreements.items)
          nextToken = agreements.nextToken
        }

        getMeeting.agreements.items = agreementItems

        this.setState({
          loading: false,
          meeting: getMeeting
        })
      }
      catch(error) {
        this.setState({ loading: false, error })
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          fetchMore={this.fetchMore}
          getMeeting={this.getMeeting()}
        />
      )
    }
  }
}

export default (WrappedComponent) => {
  return compose(
    getCurrentMeeting,
    handleLoadingAndErrors
  )(WrappedComponent)
}

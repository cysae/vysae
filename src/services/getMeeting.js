import React, { Component } from 'react'
// antd
import { message } from 'antd'
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

    componentDidMount() {
      const { match: { params: { meetingId }}} = this.props
      API.graphql(graphqlOperation(gqlToString(GetMeeting), { id: meetingId }))
        .then(({ data: { getMeeting }}) => {
          this.setState({
            loading: false,
            meeting: getMeeting
          })
        })
        .catch(error => { this.setState({ loading: false, error })})
    }

    fetchMore = () => {}

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

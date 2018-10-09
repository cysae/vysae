import React, { Component } from 'react'
import { compose } from 'recompose'
import { GetUser } from '../graphql/queries.js'
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'

const getTest = (WrappedComponent) => {
  return class extends Component {
    state = {
      loading: true,
      myUser: null
    }

    componentDidMount = async () => {
    // load some data
    const userId = '3d91c43e-de14-40fd-853c-0f38afac29b3'

    const myUser = await API.graphql(graphqlOperation(gqlToString(GetUser), { id: userId }))

    // afeter loading some data
    this.setState({ loading: false, myUser })

    }

    render() {
      console.log('wrapped component', this.props)

      if(this.state.loading)
        return <div>loading...</div>

      return <WrappedComponent {...this.props} myUser={this.state.myUser} test={true} />
    }
  }
}

export default (WrappedComponent) => getTest(WrappedComponent)

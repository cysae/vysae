import React, { Component } from 'react'
import { compose } from 'recompose'
import { GetUser } from '../graphql/queries.js'
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'

const getTest2 = (WrappedComponent) => {
  return class extends Component {
    state = {
      loading: true,
      userInfo: null
    }
    componentDidMount = async() => {
      const userId = 'nanananananaBatman'
      const userInfo = await API.graphql(graphqlOperation(gqlToString(GetUser), {id: userId}))
      this.setState({loading: false, userInfo})
    }
    render(){
      if(this.state.loading) return <div>Loading...</div>
      return <WrappedComponent {...this.props} userInfo={this.state.userInfo} test2={true}/>
    }
  }
}

export default (WrappedComponent) => getTest2(WrappedComponent)

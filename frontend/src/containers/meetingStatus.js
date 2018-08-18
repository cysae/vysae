import React, { Component } from 'react'
// antd
import { Spin } from 'antd'
// graphql
import { compose, graphql } from 'react-apollo'
import mutateVote from '../queries/mutateVote'

class MeetingStatus extends Component {
  componentDidMount() {
    const { mutateVote } = this.props
    mutateVote({
      agreementId: 'Agreement-1234',
      vote: {
        id: '1234',
        result: '1234'
      }
    }).then(res => console.log(res))
    .catch(err => console.log(err))
  }

  render() {

    return <div>convocado</div>
  }
}

const MeetingStatusWithInfo = compose(
  graphql(mutateVote, { name: 'mutateVote' })
)(MeetingStatus)

export default (MeetingStatusWithInfo)

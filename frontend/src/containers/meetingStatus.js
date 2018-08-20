import React, { Component } from 'react'
// antd
import { Spin } from 'antd'
// graphql
import { compose, graphql } from 'react-apollo'
import mutateAgreement from '../queries/mutateAgreement'

class MeetingStatus extends Component {
  componentDidMount() {
    const { mutateAgreement } = this.props
    mutateAgreement({
      variables: {
        meetingId: 'Meeting-1234',
        agreement: {
          name: '1234'
        }
      }
    }).then(res => console.log(res))
    .catch(err => console.log(err))
  }

  render() {

    return <div>convocado</div>
  }
}

const MeetingStatusWithInfo = compose(
  graphql(mutateAgreement, { name: 'mutateAgreement' })
)(MeetingStatus)

export default (MeetingStatusWithInfo)

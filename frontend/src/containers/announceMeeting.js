import React, { Component, Fragment } from 'react'
import { Steps } from 'antd'
// components
import MeetingStatus from './meetingStatus'
import MeetingConfirmation from '../components/meetingConfirmation'
// style
import styled from 'styled-components'
// graphql
import { graphql, compose } from 'react-apollo'
import queryMeetingDocx from '../queries/queryMeetingDocx'
const Step = Steps.Step

const Iframe = styled.iframe`
  width: 100%;
`

class AnnounceMeeting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      meeting: {}
    }

    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  saveMeeting() {
    const { getFieldValue } = this.props.form
    if( getFieldValue('votingPeriod') ) {
      this.setState({
        meeting: {
          companyName: 'CYSAE',
          dni: this.props.user.dni,
          location: 'Barcelona',
          meetingType: getFieldValue('meetingType'),
          votingStart: getFieldValue('votingPeriod')[0],
          votingEnd: getFieldValue('votingPeriod')[1],
          agreementTypes: getFieldValue('agreementTypes'),
          additionalInfo: getFieldValue('additionalInfo')
        }
      })
    }
  }

  render() {
    const { current, meeting } = this.state
    console.log(this.props.url)

    const steps = [{
      title: 'Convocatoria Formulario',
      content:
        <Iframe
          src="https://cysae.a.docxpresso.com/documents/preview/115?uniqid=7bcbdfa2e40a435b80a7cb8d30f44004&timestamp=1534063199&APIKEY=5bce9e199bfbe261a1049bdb472b222ab72c3a2f&options=eyJmb3JtYXQiOiJvZHQiLCJyZXNwb25zZVVSTCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8iLCJyZXNwb25zZURhdGFVUkkiOiJodHRwczovLzVmbXo0d2R5MTcuZXhlY3V0ZS1hcGkuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vZGV2L21lZXRpbmcvY29udmVuZSJ9,,">
        </Iframe>,
    }, {
      title: 'Comprobar Convocatoria',
      content: <MeetingConfirmation meeting={meeting} next={this.next} prev={this.prev}/>,
    }, {
      title: 'Estado',
      content: <MeetingStatus meeting={meeting} prev={this.prev}/>,
    }];

    return (
      <Fragment>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
      </Fragment>
    )
  }
}

const AnnounceMeetingWithData = compose(
  graphql(queryMeetingDocx, {
    props: ( data ) => {
      console.log(data)
      return {
      }
    }
  })
)(AnnounceMeeting)

export default AnnounceMeetingWithData

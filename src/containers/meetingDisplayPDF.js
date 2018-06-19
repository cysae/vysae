import React from 'react'
// redux
import { connect } from 'react-redux'
// components
import MeetingPDF from '../components/meetingPDF.js'

const MeetingDisplayPDF = props => {
  const { meeting } = props
  console.log(meeting)
  return <MeetingPDF meeting={meeting} />
}

const mapStateToProps = state => ({
  meeting: state.selectedMeeting
})

export default connect(mapStateToProps)(MeetingDisplayPDF)

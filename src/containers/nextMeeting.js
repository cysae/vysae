import React from 'react'
import { Card, Menu } from 'antd'
// redux
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { selectMeeting } from '../actions/index.js'
import moment from 'moment'
import { Link } from 'react-router-dom'

function NextMeeting(props) {
  const { meetings, selectMeeting } = props
  const meeting = meetings[0]

  return (
    <Card title="NUEVA JUNTA CONVOCADA">
      <Menu>
        <Menu.Item>
          Leer orden del día
        </Menu.Item>
        <Menu.Item>
          <Link to="/meetings/vote" onClick={() => selectMeeting(meeting)}>Votar</Link>
        </Menu.Item>
        {/* <Menu.Item>
            Leer documentación adicional
            </Menu.Item> */}
        {/* <Menu.Item>
            Ampliar orden del día
            </Menu.Item> */}
      </Menu>
    </Card>
  )
}

const getMeetings = state => state.selectedCompany.meetings
const getFutureMeetings = createSelector(
  [getMeetings],
  (meetings) => {
    return meetings.filter(meeting => {
      return moment(meeting.votingEnd).diff(moment()) > 0
    })
  }
)


const mapStateToProps = state => ({
    meetings: getFutureMeetings(state)
})
const mapDispatchToProps = dispatch => ({
  selectMeeting: meeting => dispatch(selectMeeting(meeting))
})

export default connect(mapStateToProps, mapDispatchToProps)(NextMeeting)

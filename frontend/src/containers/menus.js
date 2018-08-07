import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class RawHeaderMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    switch(pathname.substr(0, 5)) {
      case '/': return ['dashboard']
      case '/info': return ['info']
      case '/meet': return ['meetings']
      case '/añad': return ['addCompany']
      default: return ['dashboard']
    }
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={this.getSelectedKey()}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="dashboard"><Link to="/">Dashboard</Link></Menu.Item>
        <Menu.Item key="info"><Link to="/info/company">Info</Link></Menu.Item>
        <Menu.Item key="meetings"><Link to="/meetings/announce">Juntas</Link></Menu.Item>
        <Menu.Item key="addCompany"><Link to="/añadirSociedad">Añadir Sociedad</Link></Menu.Item>
      </Menu>
    )
  }
}
export const HeaderMenu = withRouter(RawHeaderMenu)


class RawMeetingMenu extends Component {
  getSelectedKey() {
    const { pathname } = this.props.location
    switch(pathname) {
      case '/meetings/next': return 'nextMeeting'
      case '/meetings/announce': return 'announceMeeting'
      case '/meetings/history': return 'meetingHistory'
      default: return 'nextMeeting'
    }
  }

  render() {
    return(
      <Menu
        selectedKeys={this.getSelectedKey()}
      >
        <Menu.Item key="nextMeeting">
          <Link to='/meetings/next'>Próxima Junta</Link>
        </Menu.Item>
        <Menu.Item key="announceMeeting">
          <Link to='/meetings/announce'>Convocatoria</Link>
        </Menu.Item>
        {/* <Menu.Item key="meetingHistory">
            <Link to='/meetings/history'>Historial de Juntas</Link>
            </Menu.Item> */}
      </Menu>
    )
  }
}

export const MeetingMenu = withRouter(RawMeetingMenu)

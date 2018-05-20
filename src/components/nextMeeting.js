import React from 'react'
import { Card, Menu } from 'antd'

export default function NextMeeting(props) {
  return (
    <Card title="NUEVA JUNTA CONVOCADA">
      <Menu>
        <Menu.Item>
          Leer orden del día
        </Menu.Item>
        <Menu.Item>
          Leer documentación adicional
        </Menu.Item>
        <Menu.Item> 
          Ampliar orden del día
        </Menu.Item>
      </Menu>
    </Card>
  )
}

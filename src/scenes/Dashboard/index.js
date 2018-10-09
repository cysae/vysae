import React from 'react'
import { Card } from 'antd'
// services
import getCompany from '../../services/getCompany'
import getUser from '../../services/getUser'

//import getTest from '../../services/getTest'
//import getTest2 from '../../services/getTest2'

import { compose } from 'recompose'

const Dashboard = (props) => {
  //const { company: { name, nif, placeOfBusiness, president, vicePresident, secretary, users, shareholders }} = props
  const { match: { params }} = props
  const { user: { id, name, companies, shareholders }} = props
  const gridStyle = {
    width: '33.333%',
    textAlign: 'center',
    backgroundColor: 'white'
  };

  console.log('some props',props)
  const myId = params.companyId // = "bcb171e6-11f8-463b-b79f-fbe146b790b8"

  //console.log(props, companies.items.filter((el) => el.company.id === myId).map(el => el.company.name))
  // return(
  //   companies.items.filter((el) => el.company.id === myId).map(el =>
  //     <div>
  //       <li key={el.company.id}>
  //         Nombre de usuario: {name}
  //       </li>
  //       <li key={el.company.name}>
  //         Accionista en: {el.company.name}
  //       </li>
  //     </div>
  //   )
  // )
  return shareholders.items.filter(el => el.company.id === myId).map(el => <div key={el.id}>{el.name}</div>)


{/*  return (

    <Card title={name} style={{ backgroundColor: '#ECECEC' }}>
      <Card.Grid style={gridStyle}>
        <Card title="Información básica" >
          <Card
            type="inner"
            title="Presidente"
          >
            {president.name}
          </Card>
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Vicepresidente"
          >
            {vicePresident.name}
          </Card>
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Secretario"
          >
            {secretary.name}
          </Card>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(0,0,0,.85)',
              marginTop: 16,
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            NIF: {nif}
          </p>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(0,0,0,.85)',
              marginBottom: 16,
              fontWeight: 500,
              }}
          >
            Ubicación: {placeOfBusiness}
          </p>
        </Card>
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Card title="Usuarios" >
          {users.items.map((element) => (
            <Card key={element.user.id} title={element.user.name} type="inner">
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(0, 0, 0, 0.85)',
                  marginTop: 8,
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                ID: {element.user.id}
              </p>
            </Card>
          ))}
        </Card>
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Card title="Accionistas">
          {shareholders.items.map((element) => (
            <Card key={element.id} title={element.name} type="inner">
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(0, 0, 0, 0.85)',
                  marginTop: 8,
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                ID: {element.id}
              </p>
            </Card>
          ))}
        </Card>
      </Card.Grid>
    </Card>
  )
*/}
}

export default compose(
//  getTest2,
  getCompany,
  getUser
)(Dashboard)

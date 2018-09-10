import React from 'react'
// services
import getCompany from '../../services/getCompany'

const Dashboard = ({ company: { name }}) => {
  return (
    <div>
      {name}
    </div>
  )
}

export default getCompany(Dashboard)

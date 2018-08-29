import React from 'react'

import { branch, renderComponent } from 'recompose'
export default (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component),
  )

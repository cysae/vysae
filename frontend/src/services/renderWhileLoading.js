import { branch, renderComponent } from 'recompose'
export default (component) =>
  branch(
    props => props.loading,
    renderComponent(component),
  )

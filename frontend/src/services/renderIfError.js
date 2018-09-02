import { branch, renderComponent } from 'recompose'
export default (component) =>
  branch(
    props => {
      console.error(props.error)
      return props.error
    },
    renderComponent(component),
  )

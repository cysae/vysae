// rerender
import { compose, mapProps, branch, renderComponent } from 'recompose'
// components
import Loading from '../components/Loading'
import Error from '../components/Error'

export default (component) => compose(
  renderWhileLoading(Loading),
  renderIfError(Error),
  mapProps(ownerProps => {
    const {loading, error, ...rest} = ownerProps
    return rest
  })
)(component)

export const renderIfError = (component) =>
  branch(
    props => {
      props.error && console.error(props.error)
      return props.error
    },
    renderComponent(component),
  )

export const renderWhileLoading = (component) =>
  branch(
    props => props.loading,
    renderComponent(component),
  )

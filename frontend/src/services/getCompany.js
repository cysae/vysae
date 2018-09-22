// graphql
import { compose, graphql } from 'react-apollo'
import QueryGetCompany from '../queries/QueryGetCompany'
// services
import handleLoadingAndErrors from './handleLoadingAndErrors'

export default (WrappedComponent) => {
  return compose(
    graphql(
      QueryGetCompany, {
        options: (props) => ({
          variables: {
            companyId: props.match.params.companyId,
          },
        }),
        props: ( { data: { error, loading, getCompany }} ) => ({
          loading,
          error,
          company: getCompany,
        })
      },
      handleLoadingAndErrors
    ),
  )(WrappedComponent)
}

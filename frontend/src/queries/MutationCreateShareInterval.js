import gql from 'graphql-tag'

export default gql(`
  mutation createShareInterval(
    $shareInterval: ShareIntervalInput!
  ) {
    createShareInterval(
      shareInterval: $shareInterval
    ) {
      companyId
      start
      end
      attributes {
        value
      }
    }
  }
`)

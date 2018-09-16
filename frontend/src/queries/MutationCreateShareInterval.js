import gql from 'graphql-tag'

export default gql(`
  mutation createShareInterval{
    createShareInterval(
      shareInterval: {
        companyId: "7e2176a2-8d59-40e0-bed6-e4d65b19e5e4"
        start: 1
        end: 1000
        attributes: {
          value: 2
        }
      }
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

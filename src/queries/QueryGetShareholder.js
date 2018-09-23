import gql from 'graphql-tag'

export default gql(`
query QueryGetShareholder {
  getShareholder {
    id
    name
    companies {
      id
      name
    }
  }
}
`)

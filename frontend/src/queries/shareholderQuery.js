import gql from 'graphql-tag'

export default gql`
query Shareholder {
  getShareholder(id: "14de04c0-7244-4174-aa2d-65d7d2eb6738") {
    id,
    name,
    companies {
      id,
      name
    }
  }
}`

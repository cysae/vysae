import gql from 'graphql-tag'

export default gql`
query Shareholder {
  getShareholder(id: "e199e636-5cff-4293-94c4-3e2e996a6ea8") {
    id,
    name,
    companies {
      id,
      name
    }
  }
}`

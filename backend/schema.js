export const typeDefs = `
  type Query {
    getCompany(name: String!): Company
    getShareholder(id: String!): Shareholder
  }
  type Company {
    id: String!
  }
  type Shareholder {
    id: String!
    companies: [Company]
  }
`

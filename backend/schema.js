export const typeDefs = `
  type Mutation {
    createCompany(
      id: String!,
      name: String,
    ): Company
  }

  type Query {
    getCompany(id: String!): Company
    getShareholder(id: String!): Shareholder
  }


  type Company {
    id: String!
  }
  type Shareholder {
    id: String!
    name: String
    companies: [Company]
  }
`

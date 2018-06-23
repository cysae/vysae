export const typeDefs = `
  type Query { getCompany(name: String!): Company }
  type Company { name: String! }
`

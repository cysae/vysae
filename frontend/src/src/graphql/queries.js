// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const GetCompany = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      users {
        nextToken
      }
    }
  }
`;
export const ListCompanys = gql`
  query ListCompanys(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
export const GetUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      companies {
        nextToken
      }
    }
  }
`;
export const ListUsers = gql`
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;

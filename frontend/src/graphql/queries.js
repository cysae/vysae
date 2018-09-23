// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const GetCompany = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      nif
      placeOfBusiness
      users {
        nextToken
      }
      shareIntervals {
        items {
          shareInterval: {
            id
            start
            end
            value
            voteWeight
          }
        }
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
        nif
        placeOfBusiness
      }
      nextToken
    }
  }
`;
export const GetShareInterval = gql`
  query GetShareInterval($id: ID!) {
    getShareInterval(id: $id) {
      id
      start
      end
      value
      voteWeight
    }
  }
`;
export const ListShareIntervals = gql`
  query ListShareIntervals(
    $filter: ModelShareIntervalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShareIntervals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        start
        end
        value
        voteWeight
      }
      nextToken
    }
  }
`;
export const GetUser = gql`
  query GetUser($id: ID! $companiesNextToken: String = null $companiesLimit: Int = 11 ) {
    getUser(id: $id) {
      id
      name
      companies (
        limit: $companiesLimit
        nextToken: $companiesNextToken
      ) {
        items {
          company {
            id
            name
          }
        }
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

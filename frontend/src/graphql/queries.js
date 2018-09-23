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
          id
          start
          end
          value
          voteWeight
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
export const GetCompanyShareInterval = gql`
  query GetCompanyShareInterval($id: ID!) {
    getCompanyShareInterval(id: $id) {
      id
      start
      end
      value
      voteWeight
      company {
        id
        name
        nif
        placeOfBusiness
      }
    }
  }
`;
export const ListCompanyShareIntervals = gql`
  query ListCompanyShareIntervals(
    $filter: ModelCompanyShareIntervalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanyShareIntervals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const GetShareholder = gql`
  query GetShareholder($id: ID!) {
    getShareholder(id: $id) {
      id
      name
      shareIntervals {
        nextToken
      }
    }
  }
`;
export const ListShareholders = gql`
  query ListShareholders(
    $filter: ModelShareholderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShareholders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
export const GetShareholderShareInterval = gql`
  query GetShareholderShareInterval($id: ID!) {
    getShareholderShareInterval(id: $id) {
      id
      start
      end
      value
      voteWeight
      shareholder {
        id
        name
      }
    }
  }
`;
export const ListShareholderShareIntervals = gql`
  query ListShareholderShareIntervals(
    $filter: ModelShareholderShareIntervalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShareholderShareIntervals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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

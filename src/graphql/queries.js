// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const GetCompany = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      nif
      placeOfBusiness
      majorities {
        items {
          id
          name
          relativeThreshold
          absoluteThreshold
          minimumVotes
          agreements {
            items {
              id
              name
            }
          }
        }
        nextToken
      }
      meetings {
        items {
          id
          name
          start
          end
        }
        nextToken
      }
      shareholders {
        items {
          id
          name
          user {
            id
          }
        }
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
export const GetMajority = gql`
  query GetMajority($id: ID!) {
    getMajority(id: $id) {
      agreements {
        items {
          id
          name
        }
        nextToken
      }
      id
      company {
        id
        name
        nif
        placeOfBusiness
      }
      name
      relativeThreshold
      absoluteThreshold
      minimumVotes
    }
  }
`;
export const ListMajoritys = gql`
  query ListMajoritys(
    $filter: ModelMajorityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMajoritys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        relativeThreshold
        absoluteThreshold
        minimumVotes
      }
      nextToken
    }
  }
`;
export const GetMajorityAgreement = gql`
  query GetMajorityAgreement($id: ID!) {
    getMajorityAgreement(id: $id) {
      id
      majority {
        id
        name
        relativeThreshold
        absoluteThreshold
        minimumVotes
      }
      name
    }
  }
`;
export const ListMajorityAgreements = gql`
  query ListMajorityAgreements(
    $filter: ModelMajorityAgreementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMajorityAgreements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
export const GetMeeting = gql`
  query GetMeeting($id: ID!) {
    getMeeting(id: $id) {
      id
      agreements {
        nextToken
      }
      start
      end
      company {
        id
        name
        nif
        placeOfBusiness
      }
    }
  }
`;
export const ListMeetings = gql`
  query ListMeetings(
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        start
        end
      }
      nextToken
    }
  }
`;
export const GetMeetingAgreement = gql`
  query GetMeetingAgreement($id: ID!) {
    getMeetingAgreement(id: $id) {
      id
      name
      meeting {
        id
        start
        end
      }
      votes {
        nextToken
      }
    }
  }
`;
export const ListMeetingAgreements = gql`
  query ListMeetingAgreements(
    $filter: ModelMeetingAgreementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetingAgreements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
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
      company {
        id
        name
        nif
        placeOfBusiness
      }
      shareIntervals {
        items {
          id
          start
          end
        }
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
      shareholders {
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
export const GetVote = gql`
  query GetVote($id: ID!) {
    getVote(id: $id) {
      id
      agreement {
        id
        name
      }
      result
      shareholder {
        id
        name
      }
    }
  }
`;
export const ListVotes = gql`
  query ListVotes(
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        result
      }
      nextToken
    }
  }
`;

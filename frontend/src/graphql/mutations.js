// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const CreateCompany = gql`
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
      name
      nif
      placeOfBusiness
      users {
        nextToken
      }
      shareIntervals {
        nextToken
      }
    }
  }
`;
export const UpdateCompany = gql`
  mutation UpdateCompany($input: UpdateCompanyInput!) {
    updateCompany(input: $input) {
      id
      name
      nif
      placeOfBusiness
      users {
        nextToken
      }
      shareIntervals {
        nextToken
      }
    }
  }
`;
export const DeleteCompany = gql`
  mutation DeleteCompany($input: DeleteCompanyInput!) {
    deleteCompany(input: $input) {
      id
      name
      nif
      placeOfBusiness
      users {
        nextToken
      }
      shareIntervals {
        nextToken
      }
    }
  }
`;
export const CreateCompanyUser = gql`
  mutation CreateCompanyUser($input: CreateCompanyUserInput!) {
    createCompanyUser(input: $input) {
      id
      company {
        id
        name
        nif
        placeOfBusiness
      }
      user {
        id
        name
      }
    }
  }
`;
export const UpdateCompanyUser = gql`
  mutation UpdateCompanyUser($input: UpdateCompanyUserInput!) {
    updateCompanyUser(input: $input) {
      id
      company {
        id
        name
        nif
        placeOfBusiness
      }
      user {
        id
        name
      }
    }
  }
`;
export const DeleteCompanyUser = gql`
  mutation DeleteCompanyUser($input: DeleteCompanyUserInput!) {
    deleteCompanyUser(input: $input) {
      id
      company {
        id
        name
        nif
        placeOfBusiness
      }
      user {
        id
        name
      }
    }
  }
`;
export const CreateShareInterval = gql`
  mutation CreateShareInterval($input: CreateShareIntervalInput!) {
    createShareInterval(input: $input) {
      id
      start
      end
      value
      voteWeight
    }
  }
`;
export const UpdateShareInterval = gql`
  mutation UpdateShareInterval($input: UpdateShareIntervalInput!) {
    updateShareInterval(input: $input) {
      id
      start
      end
      value
      voteWeight
    }
  }
`;
export const DeleteShareInterval = gql`
  mutation DeleteShareInterval($input: DeleteShareIntervalInput!) {
    deleteShareInterval(input: $input) {
      id
      start
      end
      value
      voteWeight
    }
  }
`;
export const CreateUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      companies {
        nextToken
      }
    }
  }
`;
export const UpdateUser = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      companies {
        nextToken
      }
    }
  }
`;
export const DeleteUser = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
      name
      companies {
        nextToken
      }
    }
  }
`;

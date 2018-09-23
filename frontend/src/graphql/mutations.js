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
export const CreateCompanyShareInterval = gql`
  mutation CreateCompanyShareInterval(
    $input: CreateCompanyShareIntervalInput!
  ) {
    createCompanyShareInterval(input: $input) {
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
export const UpdateCompanyShareInterval = gql`
  mutation UpdateCompanyShareInterval(
    $input: UpdateCompanyShareIntervalInput!
  ) {
    updateCompanyShareInterval(input: $input) {
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
export const DeleteCompanyShareInterval = gql`
  mutation DeleteCompanyShareInterval(
    $input: DeleteCompanyShareIntervalInput!
  ) {
    deleteCompanyShareInterval(input: $input) {
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
export const CreateShareholder = gql`
  mutation CreateShareholder($input: CreateShareholderInput!) {
    createShareholder(input: $input) {
      id
      name
      shareIntervals {
        nextToken
      }
    }
  }
`;
export const UpdateShareholder = gql`
  mutation UpdateShareholder($input: UpdateShareholderInput!) {
    updateShareholder(input: $input) {
      id
      name
      shareIntervals {
        nextToken
      }
    }
  }
`;
export const DeleteShareholder = gql`
  mutation DeleteShareholder($input: DeleteShareholderInput!) {
    deleteShareholder(input: $input) {
      id
      name
      shareIntervals {
        nextToken
      }
    }
  }
`;
export const CreateShareholderShareInterval = gql`
  mutation CreateShareholderShareInterval(
    $input: CreateShareholderShareIntervalInput!
  ) {
    createShareholderShareInterval(input: $input) {
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
export const UpdateShareholderShareInterval = gql`
  mutation UpdateShareholderShareInterval(
    $input: UpdateShareholderShareIntervalInput!
  ) {
    updateShareholderShareInterval(input: $input) {
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
export const DeleteShareholderShareInterval = gql`
  mutation DeleteShareholderShareInterval(
    $input: DeleteShareholderShareIntervalInput!
  ) {
    deleteShareholderShareInterval(input: $input) {
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

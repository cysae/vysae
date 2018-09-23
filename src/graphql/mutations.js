// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const CreateCompany = gql`
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
      name
      nif
      placeOfBusiness
      majorities {
        nextToken
      }
      meetings {
        nextToken
      }
      shareholders {
        nextToken
      }
      shareIntervals {
        nextToken
      }
      users {
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
      majorities {
        nextToken
      }
      meetings {
        nextToken
      }
      shareholders {
        nextToken
      }
      shareIntervals {
        nextToken
      }
      users {
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
      majorities {
        nextToken
      }
      meetings {
        nextToken
      }
      shareholders {
        nextToken
      }
      shareIntervals {
        nextToken
      }
      users {
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
export const CreateMajority = gql`
  mutation CreateMajority($input: CreateMajorityInput!) {
    createMajority(input: $input) {
      agreements {
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
export const UpdateMajority = gql`
  mutation UpdateMajority($input: UpdateMajorityInput!) {
    updateMajority(input: $input) {
      agreements {
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
export const DeleteMajority = gql`
  mutation DeleteMajority($input: DeleteMajorityInput!) {
    deleteMajority(input: $input) {
      agreements {
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
export const CreateMajorityAgreement = gql`
  mutation CreateMajorityAgreement($input: CreateMajorityAgreementInput!) {
    createMajorityAgreement(input: $input) {
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
export const UpdateMajorityAgreement = gql`
  mutation UpdateMajorityAgreement($input: UpdateMajorityAgreementInput!) {
    updateMajorityAgreement(input: $input) {
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
export const DeleteMajorityAgreement = gql`
  mutation DeleteMajorityAgreement($input: DeleteMajorityAgreementInput!) {
    deleteMajorityAgreement(input: $input) {
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
export const CreateMeeting = gql`
  mutation CreateMeeting($input: CreateMeetingInput!) {
    createMeeting(input: $input) {
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
export const UpdateMeeting = gql`
  mutation UpdateMeeting($input: UpdateMeetingInput!) {
    updateMeeting(input: $input) {
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
export const DeleteMeeting = gql`
  mutation DeleteMeeting($input: DeleteMeetingInput!) {
    deleteMeeting(input: $input) {
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
export const CreateMeetingAgreement = gql`
  mutation CreateMeetingAgreement($input: CreateMeetingAgreementInput!) {
    createMeetingAgreement(input: $input) {
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
export const UpdateMeetingAgreement = gql`
  mutation UpdateMeetingAgreement($input: UpdateMeetingAgreementInput!) {
    updateMeetingAgreement(input: $input) {
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
export const DeleteMeetingAgreement = gql`
  mutation DeleteMeetingAgreement($input: DeleteMeetingAgreementInput!) {
    deleteMeetingAgreement(input: $input) {
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
export const CreateShareholder = gql`
  mutation CreateShareholder($input: CreateShareholderInput!) {
    createShareholder(input: $input) {
      id
      name
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
      shareholders {
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
      shareholders {
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
      shareholders {
        nextToken
      }
    }
  }
`;
export const CreateVote = gql`
  mutation CreateVote($input: CreateVoteInput!) {
    createVote(input: $input) {
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
export const UpdateVote = gql`
  mutation UpdateVote($input: UpdateVoteInput!) {
    updateVote(input: $input) {
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
export const DeleteVote = gql`
  mutation DeleteVote($input: DeleteVoteInput!) {
    deleteVote(input: $input) {
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

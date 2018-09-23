// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const OnCreateCompany = gql`
  subscription OnCreateCompany {
    onCreateCompany {
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
export const OnUpdateCompany = gql`
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const OnDeleteCompany = gql`
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const OnCreateCompanyUser = gql`
  subscription OnCreateCompanyUser {
    onCreateCompanyUser {
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
export const OnUpdateCompanyUser = gql`
  subscription OnUpdateCompanyUser {
    onUpdateCompanyUser {
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
export const OnDeleteCompanyUser = gql`
  subscription OnDeleteCompanyUser {
    onDeleteCompanyUser {
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
export const OnCreateCompanyShareInterval = gql`
  subscription OnCreateCompanyShareInterval {
    onCreateCompanyShareInterval {
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
export const OnUpdateCompanyShareInterval = gql`
  subscription OnUpdateCompanyShareInterval {
    onUpdateCompanyShareInterval {
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
export const OnDeleteCompanyShareInterval = gql`
  subscription OnDeleteCompanyShareInterval {
    onDeleteCompanyShareInterval {
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
export const OnCreateMajority = gql`
  subscription OnCreateMajority {
    onCreateMajority {
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
export const OnUpdateMajority = gql`
  subscription OnUpdateMajority {
    onUpdateMajority {
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
export const OnDeleteMajority = gql`
  subscription OnDeleteMajority {
    onDeleteMajority {
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
export const OnCreateMajorityAgreement = gql`
  subscription OnCreateMajorityAgreement {
    onCreateMajorityAgreement {
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
export const OnUpdateMajorityAgreement = gql`
  subscription OnUpdateMajorityAgreement {
    onUpdateMajorityAgreement {
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
export const OnDeleteMajorityAgreement = gql`
  subscription OnDeleteMajorityAgreement {
    onDeleteMajorityAgreement {
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
export const OnCreateMeeting = gql`
  subscription OnCreateMeeting {
    onCreateMeeting {
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
export const OnUpdateMeeting = gql`
  subscription OnUpdateMeeting {
    onUpdateMeeting {
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
export const OnDeleteMeeting = gql`
  subscription OnDeleteMeeting {
    onDeleteMeeting {
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
export const OnCreateMeetingAgreement = gql`
  subscription OnCreateMeetingAgreement {
    onCreateMeetingAgreement {
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
export const OnUpdateMeetingAgreement = gql`
  subscription OnUpdateMeetingAgreement {
    onUpdateMeetingAgreement {
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
export const OnDeleteMeetingAgreement = gql`
  subscription OnDeleteMeetingAgreement {
    onDeleteMeetingAgreement {
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
export const OnCreateShareholder = gql`
  subscription OnCreateShareholder {
    onCreateShareholder {
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
export const OnUpdateShareholder = gql`
  subscription OnUpdateShareholder {
    onUpdateShareholder {
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
export const OnDeleteShareholder = gql`
  subscription OnDeleteShareholder {
    onDeleteShareholder {
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
export const OnCreateShareholderShareInterval = gql`
  subscription OnCreateShareholderShareInterval {
    onCreateShareholderShareInterval {
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
export const OnUpdateShareholderShareInterval = gql`
  subscription OnUpdateShareholderShareInterval {
    onUpdateShareholderShareInterval {
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
export const OnDeleteShareholderShareInterval = gql`
  subscription OnDeleteShareholderShareInterval {
    onDeleteShareholderShareInterval {
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
export const OnCreateUser = gql`
  subscription OnCreateUser {
    onCreateUser {
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
export const OnUpdateUser = gql`
  subscription OnUpdateUser {
    onUpdateUser {
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
export const OnDeleteUser = gql`
  subscription OnDeleteUser {
    onDeleteUser {
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
export const OnCreateVote = gql`
  subscription OnCreateVote {
    onCreateVote {
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
export const OnUpdateVote = gql`
  subscription OnUpdateVote {
    onUpdateVote {
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
export const OnDeleteVote = gql`
  subscription OnDeleteVote {
    onDeleteVote {
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

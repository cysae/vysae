// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const OnCreateCompany = gql`
  subscription OnCreateCompany {
    onCreateCompany {
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
export const OnUpdateCompany = gql`
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const OnDeleteCompany = gql`
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const OnCreateShareInterval = gql`
  subscription OnCreateShareInterval {
    onCreateShareInterval {
      id
      start
      end
      value
      voteWeight
    }
  }
`;
export const OnUpdateShareInterval = gql`
  subscription OnUpdateShareInterval {
    onUpdateShareInterval {
      id
      start
      end
      value
      voteWeight
    }
  }
`;
export const OnDeleteShareInterval = gql`
  subscription OnDeleteShareInterval {
    onDeleteShareInterval {
      id
      start
      end
      value
      voteWeight
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
    }
  }
`;

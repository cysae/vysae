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
export const OnCreateShareholder = gql`
  subscription OnCreateShareholder {
    onCreateShareholder {
      id
      name
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
      value
      voteWeight
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
      value
      voteWeight
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
      value
      voteWeight
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

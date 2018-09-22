// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const OnCreateCompany = gql`
  subscription OnCreateCompany {
    onCreateCompany {
      id
      name
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
      }
      user {
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

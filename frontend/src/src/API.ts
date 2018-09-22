/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateCompanyInput = {
  name: string,
};

export type UpdateCompanyInput = {
  id: string,
  name?: string | null,
};

export type DeleteCompanyInput = {
  id?: string | null,
};

export type CreateCompanyUserInput = {
  companyUserCompanyId?: string | null,
  companyUserUserId?: string | null,
};

export type UpdateCompanyUserInput = {
  id: string,
  companyUserCompanyId?: string | null,
  companyUserUserId?: string | null,
};

export type DeleteCompanyUserInput = {
  id?: string | null,
};

export type CreateUserInput = {
  name?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type ModelCompanyFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelCompanyFilterInput | null > | null,
  or?: Array< ModelCompanyFilterInput | null > | null,
  not?: ModelCompanyFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type CreateCompanyMutationVariables = {
  input: CreateCompanyInput,
};

export type CreateCompanyMutation = {
  createCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateCompanyMutationVariables = {
  input: UpdateCompanyInput,
};

export type UpdateCompanyMutation = {
  updateCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteCompanyMutationVariables = {
  input: DeleteCompanyInput,
};

export type DeleteCompanyMutation = {
  deleteCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateCompanyUserMutationVariables = {
  input: CreateCompanyUserInput,
};

export type CreateCompanyUserMutation = {
  createCompanyUser:  {
    __typename: "CompanyUser",
    id: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
    },
  } | null,
};

export type UpdateCompanyUserMutationVariables = {
  input: UpdateCompanyUserInput,
};

export type UpdateCompanyUserMutation = {
  updateCompanyUser:  {
    __typename: "CompanyUser",
    id: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
    },
  } | null,
};

export type DeleteCompanyUserMutationVariables = {
  input: DeleteCompanyUserInput,
};

export type DeleteCompanyUserMutation = {
  deleteCompanyUser:  {
    __typename: "CompanyUser",
    id: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
    },
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    companies:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    companies:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    companies:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type GetCompanyQueryVariables = {
  id: string,
};

export type GetCompanyQuery = {
  getCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListCompanysQueryVariables = {
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompanysQuery = {
  listCompanys:  {
    __typename: "ModelCompanyConnection",
    items:  Array< {
      __typename: "Company",
      id: string,
      name: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    companies:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateCompanySubscription = {
  onCreateCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateCompanySubscription = {
  onUpdateCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteCompanySubscription = {
  onDeleteCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateCompanyUserSubscription = {
  onCreateCompanyUser:  {
    __typename: "CompanyUser",
    id: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
    },
  } | null,
};

export type OnUpdateCompanyUserSubscription = {
  onUpdateCompanyUser:  {
    __typename: "CompanyUser",
    id: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
    },
  } | null,
};

export type OnDeleteCompanyUserSubscription = {
  onDeleteCompanyUser:  {
    __typename: "CompanyUser",
    id: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
    },
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    companies:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    companies:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    companies:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

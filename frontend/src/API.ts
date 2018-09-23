/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateCompanyInput = {
  name: string,
  nif?: string | null,
  placeOfBusiness?: string | null,
};

export type UpdateCompanyInput = {
  id: string,
  name?: string | null,
  nif?: string | null,
  placeOfBusiness?: string | null,
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

export type CreateShareIntervalInput = {
  start: number,
  end: number,
  value?: number | null,
  voteWeight?: number | null,
  companyShareIntervalsId?: string | null,
};

export type UpdateShareIntervalInput = {
  id: string,
  start?: number | null,
  end?: number | null,
  value?: number | null,
  voteWeight?: number | null,
  companyShareIntervalsId?: string | null,
};

export type DeleteShareIntervalInput = {
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
  nif?: ModelStringFilterInput | null,
  placeOfBusiness?: ModelStringFilterInput | null,
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

export type ModelShareIntervalFilterInput = {
  id?: ModelIDFilterInput | null,
  start?: ModelIntFilterInput | null,
  end?: ModelIntFilterInput | null,
  value?: ModelFloatFilterInput | null,
  voteWeight?: ModelFloatFilterInput | null,
  and?: Array< ModelShareIntervalFilterInput | null > | null,
  or?: Array< ModelShareIntervalFilterInput | null > | null,
  not?: ModelShareIntervalFilterInput | null,
};

export type ModelIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
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
    nif: string | null,
    placeOfBusiness: string | null,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
    shareIntervals:  {
      __typename: "ModelShareIntervalConnection",
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
    nif: string | null,
    placeOfBusiness: string | null,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
    shareIntervals:  {
      __typename: "ModelShareIntervalConnection",
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
    nif: string | null,
    placeOfBusiness: string | null,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
    shareIntervals:  {
      __typename: "ModelShareIntervalConnection",
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
      nif: string | null,
      placeOfBusiness: string | null,
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
      nif: string | null,
      placeOfBusiness: string | null,
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
      nif: string | null,
      placeOfBusiness: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
    },
  } | null,
};

export type CreateShareIntervalMutationVariables = {
  input: CreateShareIntervalInput,
};

export type CreateShareIntervalMutation = {
  createShareInterval:  {
    __typename: "ShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
  } | null,
};

export type UpdateShareIntervalMutationVariables = {
  input: UpdateShareIntervalInput,
};

export type UpdateShareIntervalMutation = {
  updateShareInterval:  {
    __typename: "ShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
  } | null,
};

export type DeleteShareIntervalMutationVariables = {
  input: DeleteShareIntervalInput,
};

export type DeleteShareIntervalMutation = {
  deleteShareInterval:  {
    __typename: "ShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
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
    nif: string | null,
    placeOfBusiness: string | null,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
    shareIntervals:  {
      __typename: "ModelShareIntervalConnection",
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
      nif: string | null,
      placeOfBusiness: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetShareIntervalQueryVariables = {
  id: string,
};

export type GetShareIntervalQuery = {
  getShareInterval:  {
    __typename: "ShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
  } | null,
};

export type ListShareIntervalsQueryVariables = {
  filter?: ModelShareIntervalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShareIntervalsQuery = {
  listShareIntervals:  {
    __typename: "ModelShareIntervalConnection",
    items:  Array< {
      __typename: "ShareInterval",
      id: string,
      start: number,
      end: number,
      value: number | null,
      voteWeight: number | null,
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
    nif: string | null,
    placeOfBusiness: string | null,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
    shareIntervals:  {
      __typename: "ModelShareIntervalConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateCompanySubscription = {
  onUpdateCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    nif: string | null,
    placeOfBusiness: string | null,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
    shareIntervals:  {
      __typename: "ModelShareIntervalConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteCompanySubscription = {
  onDeleteCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    nif: string | null,
    placeOfBusiness: string | null,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
    shareIntervals:  {
      __typename: "ModelShareIntervalConnection",
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
      nif: string | null,
      placeOfBusiness: string | null,
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
      nif: string | null,
      placeOfBusiness: string | null,
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
      nif: string | null,
      placeOfBusiness: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string | null,
    },
  } | null,
};

export type OnCreateShareIntervalSubscription = {
  onCreateShareInterval:  {
    __typename: "ShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
  } | null,
};

export type OnUpdateShareIntervalSubscription = {
  onUpdateShareInterval:  {
    __typename: "ShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
  } | null,
};

export type OnDeleteShareIntervalSubscription = {
  onDeleteShareInterval:  {
    __typename: "ShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
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

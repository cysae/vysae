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

export type CreateCompanyShareIntervalInput = {
  start: number,
  end: number,
  value?: number | null,
  voteWeight?: number | null,
  companyShareIntervalCompanyId?: string | null,
};

export type UpdateCompanyShareIntervalInput = {
  id: string,
  start?: number | null,
  end?: number | null,
  value?: number | null,
  voteWeight?: number | null,
  companyShareIntervalCompanyId?: string | null,
};

export type DeleteCompanyShareIntervalInput = {
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

export type CreateShareholderInput = {
  name: string,
};

export type UpdateShareholderInput = {
  id: string,
  name?: string | null,
};

export type DeleteShareholderInput = {
  id?: string | null,
};

export type CreateShareholderShareIntervalInput = {
  start: number,
  end: number,
  value?: number | null,
  voteWeight?: number | null,
  shareholderShareIntervalShareholderId?: string | null,
};

export type UpdateShareholderShareIntervalInput = {
  id: string,
  start?: number | null,
  end?: number | null,
  value?: number | null,
  voteWeight?: number | null,
  shareholderShareIntervalShareholderId?: string | null,
};

export type DeleteShareholderShareIntervalInput = {
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

export type ModelCompanyShareIntervalFilterInput = {
  id?: ModelIDFilterInput | null,
  start?: ModelIntFilterInput | null,
  end?: ModelIntFilterInput | null,
  value?: ModelFloatFilterInput | null,
  voteWeight?: ModelFloatFilterInput | null,
  and?: Array< ModelCompanyShareIntervalFilterInput | null > | null,
  or?: Array< ModelCompanyShareIntervalFilterInput | null > | null,
  not?: ModelCompanyShareIntervalFilterInput | null,
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

export type ModelShareholderFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelShareholderFilterInput | null > | null,
  or?: Array< ModelShareholderFilterInput | null > | null,
  not?: ModelShareholderFilterInput | null,
};

export type ModelShareholderShareIntervalFilterInput = {
  id?: ModelIDFilterInput | null,
  start?: ModelIntFilterInput | null,
  end?: ModelIntFilterInput | null,
  value?: ModelFloatFilterInput | null,
  voteWeight?: ModelFloatFilterInput | null,
  and?: Array< ModelShareholderShareIntervalFilterInput | null > | null,
  or?: Array< ModelShareholderShareIntervalFilterInput | null > | null,
  not?: ModelShareholderShareIntervalFilterInput | null,
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
      __typename: "ModelCompanyShareIntervalConnection",
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
      __typename: "ModelCompanyShareIntervalConnection",
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
      __typename: "ModelCompanyShareIntervalConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateCompanyShareIntervalMutationVariables = {
  input: CreateCompanyShareIntervalInput,
};

export type CreateCompanyShareIntervalMutation = {
  createCompanyShareInterval:  {
    __typename: "CompanyShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      nif: string | null,
      placeOfBusiness: string | null,
    },
  } | null,
};

export type UpdateCompanyShareIntervalMutationVariables = {
  input: UpdateCompanyShareIntervalInput,
};

export type UpdateCompanyShareIntervalMutation = {
  updateCompanyShareInterval:  {
    __typename: "CompanyShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      nif: string | null,
      placeOfBusiness: string | null,
    },
  } | null,
};

export type DeleteCompanyShareIntervalMutationVariables = {
  input: DeleteCompanyShareIntervalInput,
};

export type DeleteCompanyShareIntervalMutation = {
  deleteCompanyShareInterval:  {
    __typename: "CompanyShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      nif: string | null,
      placeOfBusiness: string | null,
    },
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

export type CreateShareholderMutationVariables = {
  input: CreateShareholderInput,
};

export type CreateShareholderMutation = {
  createShareholder:  {
    __typename: "Shareholder",
    id: string,
    name: string,
    shareIntervals:  {
      __typename: "ModelShareholderShareIntervalConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateShareholderMutationVariables = {
  input: UpdateShareholderInput,
};

export type UpdateShareholderMutation = {
  updateShareholder:  {
    __typename: "Shareholder",
    id: string,
    name: string,
    shareIntervals:  {
      __typename: "ModelShareholderShareIntervalConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteShareholderMutationVariables = {
  input: DeleteShareholderInput,
};

export type DeleteShareholderMutation = {
  deleteShareholder:  {
    __typename: "Shareholder",
    id: string,
    name: string,
    shareIntervals:  {
      __typename: "ModelShareholderShareIntervalConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateShareholderShareIntervalMutationVariables = {
  input: CreateShareholderShareIntervalInput,
};

export type CreateShareholderShareIntervalMutation = {
  createShareholderShareInterval:  {
    __typename: "ShareholderShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    shareholder:  {
      __typename: "Shareholder",
      id: string,
      name: string,
    },
  } | null,
};

export type UpdateShareholderShareIntervalMutationVariables = {
  input: UpdateShareholderShareIntervalInput,
};

export type UpdateShareholderShareIntervalMutation = {
  updateShareholderShareInterval:  {
    __typename: "ShareholderShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    shareholder:  {
      __typename: "Shareholder",
      id: string,
      name: string,
    },
  } | null,
};

export type DeleteShareholderShareIntervalMutationVariables = {
  input: DeleteShareholderShareIntervalInput,
};

export type DeleteShareholderShareIntervalMutation = {
  deleteShareholderShareInterval:  {
    __typename: "ShareholderShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    shareholder:  {
      __typename: "Shareholder",
      id: string,
      name: string,
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
    nif: string | null,
    placeOfBusiness: string | null,
    users:  {
      __typename: "ModelCompanyUserConnection",
      nextToken: string | null,
    } | null,
    shareIntervals:  {
      __typename: "ModelCompanyShareIntervalConnection",
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

export type GetCompanyShareIntervalQueryVariables = {
  id: string,
};

export type GetCompanyShareIntervalQuery = {
  getCompanyShareInterval:  {
    __typename: "CompanyShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      nif: string | null,
      placeOfBusiness: string | null,
    },
  } | null,
};

export type ListCompanyShareIntervalsQueryVariables = {
  filter?: ModelCompanyShareIntervalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompanyShareIntervalsQuery = {
  listCompanyShareIntervals:  {
    __typename: "ModelCompanyShareIntervalConnection",
    items:  Array< {
      __typename: "CompanyShareInterval",
      id: string,
      start: number,
      end: number,
      value: number | null,
      voteWeight: number | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetShareholderQueryVariables = {
  id: string,
};

export type GetShareholderQuery = {
  getShareholder:  {
    __typename: "Shareholder",
    id: string,
    name: string,
    shareIntervals:  {
      __typename: "ModelShareholderShareIntervalConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListShareholdersQueryVariables = {
  filter?: ModelShareholderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShareholdersQuery = {
  listShareholders:  {
    __typename: "ModelShareholderConnection",
    items:  Array< {
      __typename: "Shareholder",
      id: string,
      name: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetShareholderShareIntervalQueryVariables = {
  id: string,
};

export type GetShareholderShareIntervalQuery = {
  getShareholderShareInterval:  {
    __typename: "ShareholderShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    shareholder:  {
      __typename: "Shareholder",
      id: string,
      name: string,
    },
  } | null,
};

export type ListShareholderShareIntervalsQueryVariables = {
  filter?: ModelShareholderShareIntervalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShareholderShareIntervalsQuery = {
  listShareholderShareIntervals:  {
    __typename: "ModelShareholderShareIntervalConnection",
    items:  Array< {
      __typename: "ShareholderShareInterval",
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
      __typename: "ModelCompanyShareIntervalConnection",
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
      __typename: "ModelCompanyShareIntervalConnection",
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
      __typename: "ModelCompanyShareIntervalConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateCompanyShareIntervalSubscription = {
  onCreateCompanyShareInterval:  {
    __typename: "CompanyShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      nif: string | null,
      placeOfBusiness: string | null,
    },
  } | null,
};

export type OnUpdateCompanyShareIntervalSubscription = {
  onUpdateCompanyShareInterval:  {
    __typename: "CompanyShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      nif: string | null,
      placeOfBusiness: string | null,
    },
  } | null,
};

export type OnDeleteCompanyShareIntervalSubscription = {
  onDeleteCompanyShareInterval:  {
    __typename: "CompanyShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      nif: string | null,
      placeOfBusiness: string | null,
    },
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

export type OnCreateShareholderSubscription = {
  onCreateShareholder:  {
    __typename: "Shareholder",
    id: string,
    name: string,
    shareIntervals:  {
      __typename: "ModelShareholderShareIntervalConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateShareholderSubscription = {
  onUpdateShareholder:  {
    __typename: "Shareholder",
    id: string,
    name: string,
    shareIntervals:  {
      __typename: "ModelShareholderShareIntervalConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteShareholderSubscription = {
  onDeleteShareholder:  {
    __typename: "Shareholder",
    id: string,
    name: string,
    shareIntervals:  {
      __typename: "ModelShareholderShareIntervalConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateShareholderShareIntervalSubscription = {
  onCreateShareholderShareInterval:  {
    __typename: "ShareholderShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    shareholder:  {
      __typename: "Shareholder",
      id: string,
      name: string,
    },
  } | null,
};

export type OnUpdateShareholderShareIntervalSubscription = {
  onUpdateShareholderShareInterval:  {
    __typename: "ShareholderShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    shareholder:  {
      __typename: "Shareholder",
      id: string,
      name: string,
    },
  } | null,
};

export type OnDeleteShareholderShareIntervalSubscription = {
  onDeleteShareholderShareInterval:  {
    __typename: "ShareholderShareInterval",
    id: string,
    start: number,
    end: number,
    value: number | null,
    voteWeight: number | null,
    shareholder:  {
      __typename: "Shareholder",
      id: string,
      name: string,
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

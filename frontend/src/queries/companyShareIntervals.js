import gql from 'graphql-tag'

export const createCompanyShareInterval = gql(`
  mutation createCompanyShareInterval(
    $companyShareInterval: CompanyShareIntervalInput!
  ) {
    createCompanyShareInterval(
      companyShareInterval: $companyShareInterval
    ) {
      companyId
      start
      end
      value
      voteWeight
    }
  }
`)

export const updateCompanyShareInterval = gql(`
  mutation updateCompanyShareInterval(
    $companyShareInterval: CompanyShareIntervalInput!
  ) {
    updateCompanyShareInterval(
      companyShareInterval: $companyShareInterval
    ) {
      companyId
      start
      end
      value
      voteWeight
    }
  }
`)

export const deleteCompanyShareInterval =  gql(`
  mutation MutationDeleteCompanyShareInterval(
    $companyId: ID!
    $start: Int!
  ) {
    deleteCompanyShareInterval(
      companyId: $companyId
      start: $start
    ) {
      companyId
      start
    }
  }
`)

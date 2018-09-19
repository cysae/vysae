import gql from 'graphql-tag'

export const createShareInterval = gql(`
  mutation createShareInterval(
    $shareInterval: ShareIntervalInput!
  ) {
    createShareInterval(
      shareInterval: $shareInterval
    ) {
      companyId
      start
      end
      value
      voteWeight
    }
  }
`)

export const updateShareInterval = gql(`
  mutation updateShareInterval(
    $shareInterval: ShareIntervalInput!
  ) {
    updateShareInterval(
      shareInterval: $shareInterval
    ) {
      companyId
      start
      end
      value
      voteWeight
    }
  }
`)

export const deleteShareInterval =  gql(`
  mutation MutationDeleteShareInterval(
    $companyId: ID!
    $start: Int!
  ) {
    deleteShareInterval(
      companyId: $companyId
      start: $start
    ) {
      companyId
      start
    }
  }
`)

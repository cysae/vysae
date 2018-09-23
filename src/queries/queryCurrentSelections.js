import gql from 'graphql-tag'

export default gql`
  query queryCurrentSelections {
    currentSelections @client {
      __typename,
      companyId,
      shareholderId,
      meetingId
    }
  }
`

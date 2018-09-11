import gql from 'graphql-tag'

export default gql`
query QueryGetCompany (
  $companyId: ID!
  $meetingsLimit: Int
  $meetingsNextToken: String
  $shareholdersLimit: Int
  $shareholdersNextToken: String
) {
  getCompany(
    companyId: $companyId
  ) {
    companyId
    name,
    placeOfBusiness,
    nif,
    meetings(
      limit: $meetingsLimit
      nextToken: $meetingsNextToken
    ) @connection (
      key: ["meetings"]
    ) {
      items {
        meetingId
        start
        end
        agreements {
          agreementId
          name
        }
      }
      nextToken
    }
    myShareholders {
      shareholderId
      name
    }
    shareholders(
      limit: $shareholdersLimit
      nextToken: $shareholdersNextToken
    ) @connection (
      key: ["shareholders"]
    ) {
      items {
        shareholderId
        companyId
        userId
        name
      }
      nextToken
    }
  }
}`

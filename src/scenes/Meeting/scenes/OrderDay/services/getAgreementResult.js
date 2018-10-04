import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetMeetingAgreement } from '../../../../../graphql/queries'

const getAgreementWithResult = (agreementId) => {
  return API.graphql(
    graphqlOperation(gqlToString(GetMeetingAgreement), { id: agreementId })
  ).then(({ data: { getMeetingAgreement }}) => {
    const voteResultSum = getMeetingAgreement.votes.items.reduce(
      (acc, vote) => acc + vote.result, 0
    )
    getMeetingAgreement.result = (voteResultSum > 0) ? 1 : -1
    return getMeetingAgreement
  })
}

export default getAgreementWithResult

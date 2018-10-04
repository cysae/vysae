import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetMeetingAgreement, GetCompany } from '../../../../../graphql/queries'

const getAgreementWithResult = async (agreement, companyShareIntvls, shareholderShareIntvls) => {
  try {
    const { data: { getMeetingAgreement }} = await API.graphql(
      graphqlOperation(gqlToString(GetMeetingAgreement), { id: agreement.id })
    )

    // query ALL votes
    let nextToken = getMeetingAgreement.votes.nextToken
    const voteItems = getMeetingAgreement.votes.items
    while(nextToken) {
      const { data: { getMeetingAgreement: { votes }}} = await API.graphql(
        graphqlOperation(gqlToString(GetMeetingAgreement), {
          id: agreement.id,
          votesNextToken: nextToken
        })
      )
      voteItems.push(...votes.items)
      nextToken = votes.nextToken
    }

    getMeetingAgreement.votes.items = voteItems

    console.log('agreement result')
    console.log(voteItems)
    console.log(companyShareIntvls)

    const voteResultSum = getMeetingAgreement.votes.items.reduce(
      (acc, vote) => acc + vote.result, 0
    )
    getMeetingAgreement.result = (voteResultSum > 0) ? 1 : -1
    return getMeetingAgreement
  }
  catch(err) {
    throw err
  }
}

export default getAgreementWithResult

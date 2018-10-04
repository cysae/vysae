import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetMeetingAgreement, GetCompany } from '../../../../../graphql/queries'
import queryAllFieldItems from '../../../../../services/queryAllFieldItems'

const getAgreementResult = async (agreement, companyShareIntvls, shareholders) => {
  return new Promise((resolve, reject) => {
    API.graphql(
      graphqlOperation(gqlToString(GetMeetingAgreement), { id: agreement.id })
    ).then(({ data: { getMeetingagreement }}) => {
      const voteItems = queryAllFieldItems(agreement.id, 'votes', GetMeetingAgreement)
      console.log('result')
      console.log(voteItems)

      resolve(voteItems)


      // const voteResultSum = getMeetingAgreement.votes.items.reduce(
      //   (acc, vote) => acc + vote.result, 0
      // )
      // getMeetingAgreement.result = (voteResultSum > 0) ? 1 : -1
      // ret
    }).catch((err) => reject(err))
  })
}

export default getAgreementResult

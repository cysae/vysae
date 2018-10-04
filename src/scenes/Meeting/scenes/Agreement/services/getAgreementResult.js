import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetMeetingAgreement, GetCompany } from '../../../../../graphql/queries'
import queryAllFieldItems from '../../../../../services/queryAllFieldItems'

const getAgreementResult = async (agreementId, companyShareIntvls, shareholders) => {
  return new Promise((resolve, reject) => {
    queryAllFieldItems(agreementId, 'votes', GetMeetingAgreement)
      .then(voteItems => {
        console.log(voteItems)
        const voteResultSum = voteItems.reduce(
          (acc, vote) => acc + vote.result, 0
        )
        resolve( (voteResultSum > 0) ? 1 : -1 )

        resolve(voteItems)
    }).catch((err) => reject(err))
  })
}

export default getAgreementResult

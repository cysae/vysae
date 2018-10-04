import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetCompany, GetShareholder } from '../../../../../graphql/queries'
import Promise from 'bluebird'
import queryAllFieldItems from '../../../../../services/queryAllFieldItems'


const getCompanyShareholders = async (companyId) => {
  try {
    const shareholders = await queryAllFieldItems(companyId, 'shareholders', GetCompany)

    const promises = shareholders.map(
      shareholder => queryAllFieldItems(shareholder.id, 'shareIntervals', GetShareholder)
    )
    const shareIntervls = await Promise.all(promises)

    return shareholders.map(
      (shareholder, i) => ({
        ...shareholder,
        shareIntervals: {
          items: shareIntervls[i],
          nextToken: null
        }
      })
    )
  }
  catch(err) {
    throw err
  }
}

export default getCompanyShareholders

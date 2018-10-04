import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { GetCompany, GetShareholder } from '../../../../../graphql/queries'
import Promise from 'bluebird'

// query ALL items of `fieldType` from a parentField item selected by the `parentFieldId`
// using a GraphQL `query`
const queryAllFieldItems = async (parentFieldId, fieldType, query) => {
  const queryName = query.definitions[0].name.value.charAt(0).toLowerCase()
        + query.definitions[0].name.value.slice(1)

  let nextToken = null
  const items = []

  do {
    const { data } = await API.graphql(
      graphqlOperation(gqlToString(query), {
        id: parentFieldId,
        [`${fieldType}NextToken`]: nextToken
      })
    )
    items.push(...data[queryName][fieldType].items)
    nextToken = data[queryName][fieldType].nextToken
  } while ( nextToken )

  return items
}

const getCompanyShareholders = async (companyId) => {
  try {
    const shareholders = await queryAllFieldItems(companyId, 'shareholders', GetCompany)

    const promises = []
    for(const shareholder of shareholders) {
      promises.push(queryAllFieldItems(shareholder.id, 'shareIntervals', GetShareholder))
    }

    const shareIntervls = await Promise.all(promises)

    for(const i in shareholders) {
      shareholders[i].shareIntervals = {
        items: shareIntervls[i],
        nextToken: null
      }
    }

    return shareholders
  }
  catch(err) {
    throw err
  }
}

export default getCompanyShareholders

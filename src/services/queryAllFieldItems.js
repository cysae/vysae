import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'

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

export default queryAllFieldItems

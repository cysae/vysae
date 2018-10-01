# Amplify AppSync correction
### Reducer: Shareholder-users
`{
  "version": "2017-02-28",
  "operation": "GetItem",
  "key": {
    #if( $util.isNull($ctx.source.shareholderUserId))
      "id": $util.dynamodb.toDynamoDBJson('jo')
    #else
      "id": $util.dynamodb.toDynamoDBJson($ctx.source.shareholderUserId)
    #end
  }
}`

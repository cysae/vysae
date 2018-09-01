import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid'

AWS.config.update({ region: 'eu-west-1' })
AWS.config.setPromisesDependency(require('bluebird'));
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

// 1. link shareholder with user
// 2. link company with user

export default async (userId, shareholderId) => {
  await docClient.put({
    TableName: 'VysaeUserShareholderConnection',
    Item: {
      userShareholderConnectionId: uuid(),
      userId,
      shareholderId,
    }
  }).promise()

  linkUserWithShareholderCompany(userId, shareholderId)
}

const linkUserWithShareholderCompany = async (userId, shareholderId) => {
  const companyId = (await docClient.query({
    TableName: 'VysaeCompanyShareholderConnection',
    IndexName: 'Shareholder',
    KeyConditionExpression: 'shareholderId = :shareholderId',
    ExpressionAttributeValues: {
      ':shareholderId': shareholderId
    }
  }).promise()).Items[0].companyId

  await docClient.put({
    TableName: 'VysaeUserCompanyConnection',
    Item: {
      userCompanyConnectionId: uuid(),
      userId,
      companyId,
    }
  }).promise()
}


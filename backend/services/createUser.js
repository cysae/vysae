import Amplify, { Auth } from 'aws-amplify'
import generator from 'generate-password'
// node 6... has no fetch
import fetch from 'node-fetch'
global.fetch = fetch
import AWS from 'aws-sdk';
import sendMail from './sendMail'

AWS.config.update({ region: 'eu-west-1' })
AWS.config.setPromisesDependency(require('bluebird'));
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

Amplify.configure({
  Auth: {
    identityPoolId: 'eu-west-1:5e331c35-306a-4885-9044-383af2ad1067',
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_MUEHMQ2R2',
    userPoolWebClientId: '675m7ktuif5or2ci1nq9tg1nu9'
  }
})

export default (userInput) => {
  const { username, email, phone_number } = userInput
  const password = generator.generate({ length: 8, numbers: true, symbols: true, strict: true })

  return new Promise( async (resolve, reject) => {

    // create user in userpool
    try {
      const authResult = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number,
        }
      })
      const { userSub } = authResult

      // create user in dynamodb
      await docClient.put({
        TableName: 'VysaeUser',
        Item: {
          'userId': userSub
        }
      }).promise()


      const body = `Username: ${username}, Password: ${password}`
      await sendMail(email, 'Welcome to CYSAE', body)

      resolve({
        userId: userSub,
        username,
        email,
        phone_number
      })
    }
    catch (err) {
      reject(err)
    }
  })
}

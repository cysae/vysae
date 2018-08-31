import AWS from 'aws-sdk';
import Amplify, { Auth } from 'aws-amplify'
import generator from 'generate-password'
// node 6... has no fetch
import fetch from 'node-fetch'
global.fetch = fetch
AWS.config.update({ region: 'eu-west-1' })
AWS.config.setPromisesDependency(require('bluebird'));

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

  return new Promise(async (resolve, reject) => {
    // create user in userpool
    try {
      const authResult = await auth.signUp({
        username,
        password,
        attributes: {
          email: email,
          phone_number: phone_number,
        }
      })
      const { usersub } = authResult

      // create user in dynamodb
      await docClient.put({
        tablename: 'VysaeUser',
        item: {
          'userId': userSub
        }
      }).promise()

      resolve({
        userId: userSub,
        username,
        password,
        email,
        phone_number
      })
    }
    catch (err) {
      reject(err)
    }
  })
}

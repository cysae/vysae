import docx from 'docxpresso'
import Amplify, { Auth } from 'aws-amplify'
import generator from 'generate-password'
// node 6... has no fetch
import fetch from 'node-fetch'
global.fetch = require('node-fetch')
import AWS from 'aws-sdk';
import sendMail from './services/sendMail'
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

module.exports.meetingDocx = (event, context, callback) => {
  const url = docx.previewDocument(
    115,
    'http://localhost:3000/',
    'https://5fmz4wdy17.execute-api.eu-west-1.amazonaws.com/dev/meeting/convene'
  )

  callback(null, { url })
}

module.exports.conveneMeeting = (event, context, callback) => {
  console.log(event)
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};

// create user
module.exports.createuser = async (event, context, callback) => {
  context.callbackwaitsforemptyeventloop = false;

  const { username, email, phone_number } = event.arguments

  // create user in userpool
  try {
    const authresult = await auth.signup({
      username: username,
      password: generator.generate({ length: 8, numbers: true, symbols: true, strict: true }),
      attributes: {
        email: email,
        phone_number: phone_number,
      }
    })
    const { usersub } = authresult

    // create user in dynamodb
    await docclient.put({
      tablename: 'vysaeuser',
      item: {
        'userid': usersub
      }
    }).promise()

    callback(null, {
      userid: usersub,
      username,
      email,
      phone_number
    })
  }
  catch (err) {
    console.error('error \n', err, '\n')
    callback(null, {
      userid: null,
      username: null,
      email: null,
      phone_number: null
    })
  }
}

// link user
module.exports.linkShareholderWithUser = async (event, context, callback) => {
  context.callbackwaitsforemptyeventloop = false;

  // const { shareholderId, userInput: { username, email, phone_number } } = event.arguments

  // Create sendEmail params
  await sendMail('dirkhornung91@gmail.com', 'subject', 'body')
}

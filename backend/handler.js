import docx from 'docxpresso'
import Amplify, { Auth } from 'aws-amplify'
import generator from 'generate-password'

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
module.exports.createUser = async (event, context, callback) => {
  const { username, email, phone_number } = event.arguments
  const { userSub } = await Auth.signUp({
    username: username,
    password: generator.generate({ length: 8, numbers: true, symbols: true, strict: true }),
    attributes: {
      email: email,
      phone_number: phone_number,
    }
  })
  callback(null, {
    userId: userSub,
    username,
    email,
    phone_number
  })
}

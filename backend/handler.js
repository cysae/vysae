import docx from 'docxpresso'
import sendMail from './services/sendMail'
import createUser from './services/createUser'

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
  context.callbackwaitsforemptyeventloop = false;

  const { username, email, phone_number } = event.arguments

  const userInput = { username, email, phone_number }
  try {
    const user = await createUser(userInput)
    console.log(user)
  }
  catch(err) {
    console.error(err)
  }
}

// link user
module.exports.linkShareholderWithUser = async (event, context, callback) => {
  context.callbackwaitsforemptyeventloop = false;

  // const { shareholderId, userInput: { username, email, phone_number } } = event.arguments

  // Create sendEmail params
  await sendMail('dirkhornung91@gmail.com', 'subject', 'body')
}

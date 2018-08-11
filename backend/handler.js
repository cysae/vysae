const docx = require('docxpresso')

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

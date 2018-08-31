import AWS from 'aws-sdk';
AWS.config.update({ region: 'eu-west-1' })
AWS.config.setPromisesDependency(require('bluebird'));

export default (toAddress, subject, body) => {
  var params = {
    Destination: {
      ToAddresses: [
        'dirkhornung91@gmail.com',
      ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "HTML_FORMAT_BODY"
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY"
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test email'
      }
    },
    Source: 'bot@cysae.com',
    ReplyToAddresses: [
      'info@cysae.com',
    ],
  };

  const awsSES = new AWS.SES({ apiVersion: '2010-12-01' })
  return awsSES.sendEmail(params).promise()
}

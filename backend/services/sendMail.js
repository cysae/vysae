import AWS from 'aws-sdk';
AWS.config.update({ region: 'eu-west-1' })
AWS.config.setPromisesDependency(require('bluebird'));

export default (toAddress, subject, body) => {
  var params = {
    Destination: {
      ToAddresses: [
        toAddress,
      ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body
        },
        Text: {
          Charset: "UTF-8",
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: 'bot@cysae.com',
    ReplyToAddresses: [
      'dirk.hornung@cysae.com',
    ],
  };

  const awsSES = new AWS.SES({ apiVersion: '2010-12-01' })
  return awsSES.sendEmail(params).promise()
}

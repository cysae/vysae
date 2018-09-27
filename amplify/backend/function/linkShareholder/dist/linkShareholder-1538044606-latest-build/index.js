const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log('event', event);

  // local testing
  if(!event.headers)
    event.headers = {
      ['content-type']: 'application/json'
    }

  awsServerlessExpress.proxy(server, event, context);
};

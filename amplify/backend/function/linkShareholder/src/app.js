/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const sendMail = require('./sendMail.js');
const htmlToPdf = require('./htmlToPdf.js')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/linkShareholder', function(req, res) {
  // Add your code here
  // sendMail('dirkhornung91@gmail.com', 'test', 'body')
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/linkShareholder', async function(req, res) {
  let host = 'http://vysae-hosting-dev.s3-website-eu-west-1.amazonaws.com'
  if(req.headers === 'localhost')
    host = 'http://localhost:3000'


  const { email, companyId, shareholderId } = req.body
  const msg = `<a href="${host}/linkShareholder/${companyId}/${shareholderId}">Invitation Link</a>`
  await sendMail(req.body.email, 'Invitacion', msg)
  res.json({success: 'posti call succeed!', url: req.url, body: req.body})
});

app.post('/acta', function(req, res) {
  htmlToPdf('<body>Hello World</body>', (pdf) => {
    const filename = 'acta.pdf'
    res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
    res.setHeader('isBase64Encoded', true);//isBase64Encoded: true
    res.status(200).send(pdf)
  })
});

/****************************
* Example post method *
****************************/

app.put('/items', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/items', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app

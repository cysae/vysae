var AWS = require('aws-sdk');
import dynamodb from 'serverless-dynamodb-client';

let docClient;
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    docClient = new AWS.DynamoDB.DocumentClient();
} else {
    docClient = dynamodb.doc;
}

const promisify = foo =>
      new Promise((resolve, reject) => {
          foo((error, result) => {
              if (error) {
                  reject(error);
              } else {
                  if(result.Items.length > 0) {
                      resolve({ name: result.Items[0].name})
                  } else {
                      resolve(null);
                  }
              }
          });
      });

export const resolvers = {
    Query: { getCompany: (root, args) => getCompany(args)},
};

function getCompany(args) {
    return promisify(callback =>
                     docClient.query(
                         {
                             TableName: 'vysae',
                             KeyConditionExpression: '#name = :v1',
                             ExpressionAttributeNames:{
                                 "#name": "name"
                             },
                             ExpressionAttributeValues: {
                                 ':v1': args.name,
                             },
                         },
                         callback
                     )
                    )
}

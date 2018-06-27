var AWS = require('aws-sdk');
import dynamodb from 'serverless-dynamodb-client';
import Promise from 'Bluebird'

let docClient;
if (process.env.NODE_ENV === 'production') {
    docClient = new AWS.DynamoDB.DocumentClient();
} else {
    docClient = new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    })
    Promise.promisifyAll(Object.getPrototypeOf(docClient));
}

const promisify = foo =>
      new Promise((resolve, reject) => {
          foo((error, result) => {
              if (error) {
                  reject(error);
              } else {
                  console.log(result)
                  if(result.Items.length > 0) {
                      resolve({
                          id: result.Items[0].PK.slice(-36),
                          name: result.Items[0].name
                      })
                  } else {
                      resolve(null);
                  }
              }
          });
      });


export const resolvers = {
    Query: {
        getCompany: (root, args) => getCompany(args),
        getShareholder: (root, args) => getShareholder(args),
    },
};

function getCompany(args) {
    return promisify(callback =>
                     docClient.query(
                         {
                             TableName: 'Vysae',
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

function getShareholder(args) {
    return docClient.queryAsync(
        {
            TableName: 'Vysae',
            IndexName: 'GSI',
            KeyConditionExpression: 'SK = :v1',
            ExpressionAttributeValues: {
                ':v1': `Shareholder-${args.id}`,
            },
        },
    ).then(res => {
        const shareholder = {
            id: null,
            companies: []
        }
        for(const item of res.Items) {
            if(item.PK.substr(0, 7) === 'Company') {
                shareholder.companies.push({
                    id: item.PK.slice(-36)
                })
            }
            if(item.PK.substr(0, 11) === 'Shareholder') {
                shareholder.id = item.PK.slice(-36)
            }
        }
        return shareholder
    }).catch(err => console.log(err))
}

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


export const resolvers = {
    Mutation: {
        createCompany: (root, args) => createCompany(args),
    },
    Query: {
        getCompany: (root, args) => getCompany(args),
        getShareholder: (root, args) => getShareholder(args),
    },
};

function createCompany(args) {
    const companyId = `Company-${args.id}`
    return docClient.putAsync({
        TableName: 'Vysae',
        Item: {
            PK: companyId,
            SK: companyId,
            name: args.name
        }
    }).then(() => ({
        id: companyId,
    })).catch(err => console.log(err))
}

function getCompany(args) {
    return docClient.queryAsync({
        TableName: 'Vysae',
        KeyConditionExpression: 'PK = :v1',
        ExpressionAttributeValues: {
            ':v1': `Company-${args.id}`
        },
    }).then(res => {
        if(res.Items.length > 0) {
            return {
                id: res.Items[0].PK.slice(-36),
                name: res.Items[0].name
            }
        } else {
            return null;
        }
    }).catch(err => console.log('graphql: getCompany', err))
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
            name: null,
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
                shareholder.name = item.name
            }
        }
        return shareholder
    }).catch(err => console.log('graphql: getShareholder', err))
}

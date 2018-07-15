const AWS = require('aws-sdk');
const fs = require('fs');
const path = require("path");

AWS.config.update({ region: 'eu-west-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing data into DynamoDB. Pleas wait.');

const vysae = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'vysae.json'), 'utf8'));

vysae.forEach(function(row) {
    const params = {
        TableName: 'Vysae',
        Item: {
            PK: row.PK,
            SK: row.SK,
            name: row.name
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error('Unable to add row', row.PK, JSON.stringify(err, null, 2));
        } else {
            console.log('PutItem succeeded:', row.PK)
        }
    });
});

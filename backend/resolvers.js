export const resolvers = {
    Query: { getCompany: (root, args) => getCompany(args),},
};

function getCompany(args) {
    return promisify(callback =>
                     docClient.query(
                         {
                             TableName: 'vysae',
                             KeyConditionExpression: 'handle = :v1',
                             ExpressionAttributeValues: {
                                 ':v1': args.handle,
                             },
                         },
                         callback
                     )
                    )
}

import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const myGraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: console
});

exports.graphqlHandler = function graphqlHandler(event, context, callback) {
    function callbackWithHeaders(error, output) {
        // eslint-disable-next-line no-param-reassign
        output.headers['Access-Control-Allow-Origin'] = '*';
        callback(error, output);
    }

    const handler = graphqlLambda({ schema: myGraphQLSchema });
    return handler(event, context, callbackWithHeaders);
};

exports.graphiqlHandler = graphiqlLambda({
    endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT
        ? process.env.REACT_APP_GRAPHQL_ENDPOINT
        : '/production/graphql',
});

module.exports.hello = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
        }),
    };

    callback(null, response);

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

'use strict';

const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const PatientAPI = require('./patient-api')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  dataSources: () => {
      return {
          patientAPI: new PatientAPI(),
      }
  },
});

exports.handler = server.createHandler({
  cors: {
      origin: '*',
      credentials: true,
  },
});

// module.exports.graphqlHandler = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

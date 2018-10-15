import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
// resolvers
import * as queryResolvers from './resolvers';
import * as typeResolvers from './resolvers/typeResolvers';
// schema
const typeDefs = importSchema('./schemas/app.graphql');

const resolvers = {
  // Top level resolvers
  Query: queryResolvers,
  // Type resolvers
  ...typeResolvers
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  cacheControl: true
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

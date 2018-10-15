const { ApolloServer } = require('apollo-server');
const fetch = require('node-fetch');
const { importSchema } = require('graphql-import');
const memoize = require('memoizee');

// resolvers
const typeResolvers = require('./resolvers/typeResolvers');
const query = require('./resolvers/QueryResolver');
// utils
const sortPlayers = require('./utils/sortPlayers');
// schema
const typeDefs = importSchema('./schemas/app.graphql');

const resolvers = {
  Query: {
    async players(_, { per_page: perPage, page, sortOption, sortOrder, filter }) {
      try {
        const getData = () =>
          fetch('https://fantasy.premierleague.com/drf/bootstrap-static').then(res => res.json());
        const memoizedData = memoize(getData, { promise: true, maxAge: 1000 * 60 * 60 });
        const data = await memoizedData();
        const sortedData = sortOption
          ? data.elements.sort(sortPlayers(sortOption, sortOrder))
          : data.elements;
        const updatedPage = page - 1;
        return sortedData.slice(updatedPage * perPage, perPage * page);
        // return data.elements
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  ...typeResolvers
};
// TODO why doesnt this work?
const resolvers2 = {
  Query: query,
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

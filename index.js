const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');
const { importSchema } = require('graphql-import');

const typeResolvers = require('./resolvers/typeResolvers');
const query = require('./resolvers/QueryResolver');

const typeDefs = importSchema('./schema/app.graphql');

function sortPlayers(sort, sortOrder) {
  return function (a, b) {
    console.log(sort)
    const optionA = typeof a[sort] === 'number' ? a[sort] : a[sort].toUpperCase();
    const optionB = typeof b[sort] === 'number' ? b[sort] : b[sort].toUpperCase();
    if (sortOrder === 'ASC') {
      if (optionA < optionB) {
        return -1;
      }
      if (optionA > optionB) {
        return 1;
      }
    } else {
      if (optionA < optionB) {
        return 1;
      }
      if (optionA > optionB) {
        return -1;
      }
    }
    // equal 
    return 0;
  }
}

// Resolvers define the technique for fetching the types in the
// schema.  
const resolvers = {
  Query: {
    async getPlayers(_, { per_page, page, sort, sortOrder, filter }) {
      try {
        const data = await fetch(`https://fantasy.premierleague.com/drf/bootstrap-static`).then(data => data.json());

        const sortedData = sort ? data.elements.sort(sortPlayers(sort, sortOrder)) : data.elements;

        const updatedPage = page - 1;
        return sortedData.slice((updatedPage * per_page), (per_page * page));
      }
      catch (err) {

      }
    },
  },
  ...typeResolvers


};
//TOD why doesnt this work?
const resolvers2 = {
  Query: query,
  ...typeResolvers
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers, tracing: true });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
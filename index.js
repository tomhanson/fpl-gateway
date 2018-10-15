const { ApolloServer, gql } = require("apollo-server");
const fetch = require("node-fetch");
const { importSchema } = require("graphql-import");

//resolvers
const typeResolvers = require("./resolvers/typeResolvers");
const { query } = require("./resolvers/QueryResolver");
//utils
const sortPlayers = require("./utils/sortPlayers");
//schema
const typeDefs = importSchema("./schema/app.graphql");

const resolvers = {
  Query: {
    async players(_, { per_page, page, sortOption, sortOrder, filter }) {
      try {
        const data = await fetch(
          `https://fantasy.premierleague.com/drf/bootstrap-static`
        ).then(data => data.json());

        const sortedData = sortOption
          ? data.elements.sort(sortPlayers(sortOption, sortOrder))
          : data.elements;
        // console.log("data", Object.keys(data));
        console.log("data", data["teams"]);
        const updatedPage = page - 1;
        return sortedData.slice(updatedPage * per_page, per_page * page);
      } catch (err) {}
    }
  },
  ...typeResolvers
};

//TODO why doesnt this work?
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

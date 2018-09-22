const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');
const { importSchema } = require('graphql-import');

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
        // return data.elements
      }
      catch (err) {

      }
    },
  },
  SortOption: {
    firstName: 'first_name',
    lastName: 'second_name',
    id: 'id',
    squadNumber: 'squad_number',
    chanceOfPlayingThisRound: 'chance_of_playing_this_round',
    chanceOfPlayingNextRound: 'chance_of_playing_next_round',
    totalTransfersOut: 'transfers_out',
    totalTransfersIn: 'transfers_in',
    percentSelected: 'selected_by_percent',
    totalPoints: 'total_points',
    totalMinutesPlayed: 'minutes',
    yellowCards: 'yellow_cards',
    redCards: 'red_cards',
    penaltiesSaved: 'penalties_saved',
    penaltiesMissed: 'penalties_missed',
    cost: 'now_cost',
    timesInDreamTeam: 'dreamteam_count',
    inCurrentDreamTeam: 'in_dreamteam',
    averagePointsPerGame: 'points_per_game',
    goals: 'goals_scored',
    cleanSheets: 'clean_sheets',
    goalsConceded: 'goals_conceded'
  },
  playerData: {
    firstName: ({ first_name }) => first_name,
    lastName: ({ second_name }) => second_name,
    id: ({ id }) => id,
    squadNumber: ({ squad_number }) => squad_number,
    chanceOfPlayingThisRound: ({ chance_of_playing_this_round }) => chance_of_playing_this_round,
    chanceOfPlayingNextRound: ({ chance_of_playing_next_round }) => chance_of_playing_next_round,
    totalTransfersOut: ({ transfers_out }) => transfers_out,
    totalTransfersIn: ({ transfers_in }) => transfers_in,
    percentSelected: ({ selected_by_percent }) => selected_by_percent,
    totalPoints: ({ total_points }) => total_points,
    totalMinutesPlayed: ({ minutes }) => minutes,
    yellowCards: ({ yellow_cards }) => yellow_cards,
    redCards: ({ red_cards }) => red_cards,
    penaltiesSaved: ({ penalties_saved }) => penalties_saved,
    penaltiesMissed: ({ penalties_missed }) => penalties_missed,
    cost: ({ now_cost }) => (now_cost / 10).toFixed(1),
    timesInDreamTeam: ({ dreamteam_count }) => dreamteam_count,
    inCurrentDreamTeam: ({ in_dreamteam }) => in_dreamteam,
    averagePointsPerGame: ({ points_per_game }) => points_per_game,
    goals: ({ goals_scored }) => goals_scored,
    cleanSheets: ({ clean_sheets }) => clean_sheets,
    goalsConceded: ({ goals_conceded }) => goals_conceded
  }


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
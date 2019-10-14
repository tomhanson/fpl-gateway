/* eslint-disable */
const PlayerData = {
  firstName: ({ first_name }) => first_name,
  lastName: ({ second_name }) => second_name,
  position: ({ positions }) => positions,
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
};

export default PlayerData;

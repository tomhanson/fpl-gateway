const filterPlayers = (players, filter) => {
  if (!filter) {
    return players;
  }

  if (filter.limit) {
    return players.filter(player => player[filter.key] <= filter.limit);
  }

  return players.filter(player => player[filter.key] === filter.value);
};

export default filterPlayers;

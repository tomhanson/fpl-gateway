const filterPlayers = (players, filter) => {
  if (!filter) {
    return players;
  }

  return players.filter(player => player[filter.key] === filter.value);
};

export default filterPlayers;

import sortPlayers from '../utils/sortPlayers';

const addPosition = (players, positions) =>
  players.map(player => {
    const newPlayer = { ...player, positionData: positions[player.element_type] };
    return newPlayer;
  });

const getPositions = positionData =>
  positionData.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

const getPlayers = data => {
  const positions = getPositions(data.element_types);
  return addPosition(data.elements, positions);
};

const players = async (_, { perPage, page, sortOption, sortOrder }, { data }) => {
  try {
    const playerData = getPlayers(data);
    const sortedData = sortOption
      ? playerData.sort(sortPlayers(sortOption, sortOrder))
      : playerData;
    const updatedPage = page - 1;
    return sortedData.slice(updatedPage * perPage, perPage * page);
  } catch (err) {
    throw new Error(err);
  }
};

export default players;

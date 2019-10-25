import sortPlayers from '../utils/sortPlayers';
import filterPlayers from '../utils/filterPlayers';

const addPosition = (players, positions) =>
  players.map(player => {
    const newPlayer = {
      ...player,
      position_short_name: positions[player.element_type].singular_name_short,
      position: positions[player.element_type].singular_name
    };
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

const players = async (_, { perPage, page, sort, filter }, { data }) => {
  try {
    // Get player data with positions
    const playerData = getPlayers(data);

    // Apply any filters to data
    const filteredPlayers = filterPlayers(playerData, filter);

    // sort data
    const sortedData = sort
      ? filteredPlayers.sort(sortPlayers(sort.option, sort.order))
      : filteredPlayers;
    const updatedPage = page - 1;
    return sortedData.slice(updatedPage * perPage, perPage * page);
  } catch (err) {
    throw new Error(err);
  }
};

export default players;

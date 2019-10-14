function sortPlayers(sortOption, sortOrder) {
  return (a, b) => {
    let optionA;
    let optionB;
    if (Number(a[sortOption]) !== 0) {
      if (Number(a[sortOption])) {
        optionA = Number(a[sortOption]);
      } else {
        optionA = a[sortOption].toUpperCase();
      }
    } else {
      optionA = 0;
    }

    if (Number(b[sortOption]) !== 0) {
      if (Number(b[sortOption])) {
        optionB = Number(b[sortOption]);
      } else {
        optionB = b[sortOption].toUpperCase();
      }
    } else {
      optionB = 0;
    }

    if (sortOrder === 'DESC') {
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
  };
}

function addPosition(players, positions) {
  return players.map(player => {
    const newPlayer = { ...player, positions: positions[player.element_type] };
    // console.log('newPlayer', newPlayer);
    return newPlayer;
  });
}

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
    console.log(
      'sortedData.slice(updatedPage * perPage, perPage * page)',
      sortedData.slice(updatedPage * perPage, perPage * page)
    );
    return sortedData.slice(updatedPage * perPage, perPage * page);
  } catch (err) {
    console.log('err', err);
    throw new Error(err);
  }
};

export default players;

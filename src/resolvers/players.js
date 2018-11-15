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
    const newPlayer = { ...player, position: positions[player.element_type] };
    return newPlayer;
  });
}

const players = async (_, { perPage, page, sortOption, sortOrder }, { data }) => {
  try {
    const positions = data.element_types.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
    const sortedData = sortOption
      ? addPosition(data.elements, positions).sort(sortPlayers(sortOption, sortOrder))
      : data.elements;
    const updatedPage = page - 1;
    return sortedData.slice(updatedPage * perPage, perPage * page);
  } catch (err) {
    throw new Error(err);
  }
};

export default players;

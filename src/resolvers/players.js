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

const players = async (_, { perPage, page, sortOption, sortOrder }, { data }) => {
  try {
    const sortedData = sortOption
      ? data.elements.sort(sortPlayers(sortOption, sortOrder))
      : data.elements;
    const updatedPage = page - 1;
    return sortedData.slice(updatedPage * perPage, perPage * page);
  } catch (err) {
    throw new Error(err);
  }
};

export default players;

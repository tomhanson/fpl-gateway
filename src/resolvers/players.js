function sortPlayers(sort, sortOrder) {
  return (a, b) => {
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
  };
}

const players = async (_, { per_page, page, sort, sortOrder }, { getData }) => {
  try {
    const data = await getData();
    const sortedData = sort ? data.elements.sort(sortPlayers(sort, sortOrder)) : data.elements;
    const updatedPage = page - 1;
    return sortedData.slice(updatedPage * per_page, per_page * page);
    // return data.elements
  } catch (err) {
    throw new Error(err);
  }
};

export default players;

import fetch from 'node-fetch';
import memoize from 'memoizee';

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

const players = async (_, { per_page, page, sort, sortOrder, filter }) => {
  try {
    const getData = () =>
      fetch('https://fantasy.premierleague.com/drf/bootstrap-static').then(res => res.json());
    const memoizedData = memoize(getData, { promise: true, maxAge: 1000 * 60 * 60 });
    const data = await memoizedData();
    const sortedData = sort ? data.elements.sort(sortPlayers(sort, sortOrder)) : data.elements;
    const updatedPage = page - 1;
    return sortedData.slice(updatedPage * per_page, per_page * page);
    // return data.elements
  } catch (err) {
    throw new Error(err);
  }
};

export default players;

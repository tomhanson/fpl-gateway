const fetch = require("node-fetch");

const query = (module.exports = {
  async players(_, { per_page, page, sort, sortOrder, filter }) {
    try {
      const data = await fetch(
        "https://fantasy.premierleague.com/drf/bootstrap-static"
      ).then(data => data.json());

      const sortedData = sort
        ? data.elements.sort(sortPlayers(sort, sortOrder))
        : data.elements;

      const updatedPage = page - 1;
      return sortedData.slice(updatedPage * per_page, per_page * page);
      // return data.elements
    } catch (err) {}
  }
});

function sortPlayers(sort, sortOrder) {
  return (a, b) => {
    const optionA =
      typeof a[sort] === "number" ? a[sort] : a[sort].toUpperCase();

    const optionB =
      typeof b[sort] === "number" ? b[sort] : b[sort].toUpperCase();
    if (sortOrder === "ASC") {
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

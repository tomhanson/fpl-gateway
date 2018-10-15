module.exports = function sortPlayers(sortOption, sortOrder) {
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
    // const optionA = Number(a[sortOption]) !== 0 ? Number(a[sortOption]) || a[sortOption].toUpperCase() || 0;
    // const optionB = Number(b[sortOption]) !== 0 ? Number(b[sortOption]) || b[sortOption].toUpperCase() || 0;

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
};

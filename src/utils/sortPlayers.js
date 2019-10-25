const sortPlayers = (sortOption, sortOrder) => (a, b) => {
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

export default sortPlayers;

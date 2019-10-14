/* eslint-disable */
const PlayerPositionData = {
  id: ({ id }) => id,
  singularName: ({ singular_name }) => console.log('singular_name', singular_name) || singular_name,
  shortName: ({ singular_name_short }) => singular_name_short
};

export default PlayerPositionData;

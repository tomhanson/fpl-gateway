// @flow

const teams = async (_, args, { getData }) => {
  try {
    const data = await getData();
    console.log('teams', data.teams);
    return data.teams;
  } catch (err) {
    throw new Error(err);
  }
};

export default teams;

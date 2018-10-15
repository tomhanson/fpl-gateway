// @flow

const teams = async (_, args, { getData }) => {
  try {
    const data = await getData();
    return data.teams;
  } catch (err) {
    throw new Error(err);
  }
};

export default teams;

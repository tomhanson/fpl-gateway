const teams = async (_, args, { data }) => {
  try {
    const res = await data;
    console.log('teams', res.teams);
    return res.teams;
  } catch (err) {
    throw new Error(err);
  }
};

export default teams;

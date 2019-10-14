const teams = async (_, args, { data }) => {
  try {
    const res = await data;
    return res.teams;
  } catch (err) {
    throw new Error(err);
  }
};

export default teams;

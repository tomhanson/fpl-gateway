import fetch from 'node-fetch';
import memoize from 'memoizee';

const getData = async () => {
  const data = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/').then(res =>
    res.json()
  );
  return data;
};

export default memoize(getData, {
  profileName: 'getData',
  maxAge: 60 * 60
});

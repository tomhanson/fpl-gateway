import fetch from 'node-fetch';
import memoize from 'memoizee';

const getData = async () => {
  const data = await fetch('https://fantasy.premierleague.com/drf/bootstrap-static').then(res =>
    res.json()
  );
  return data;
};

export default memoize(getData, {
  profileName: 'getData',
  maxAge: 1000 * 60 * 60,
  prefetch: true
});

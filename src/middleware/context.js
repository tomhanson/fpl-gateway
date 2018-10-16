import memoziedGetData from '../utils/getData';

export default async () => {
  const data = await memoziedGetData();

  return {
    data
  };
};

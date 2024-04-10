import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://api.monobank.ua/bank/currency',
// });

// instance.defaults.headers.common['Authorization'] =
//   'u6tyTmbRYNTk3d4JugZFYkvtQ8PM108ncCEiGIYjOmj0';

export const currencyFetch = async () => {
  const data = await axios.get('https://api.monobank.ua/bank/currency');
  return data;
};



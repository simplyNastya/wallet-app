import axios from 'axios';

const fetchChart = async () => {
  const data = await axios.get('https://api.monobank.ua/bank/currency');
  return data;
};

export default fetchChart;

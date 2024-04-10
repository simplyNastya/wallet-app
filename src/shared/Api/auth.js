import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://wallet.b.goit.study/',
});

const setToken = token => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = '';
};

export const register = async payload => {
  const { data: result } = await instance.post('/api/auth/sign-up', payload);
  setToken(result.token);
  return result;
};

export const login = async data => {
  const { data: result } = await instance.post('/api/auth/sign-in', data);
  setToken(result.token);
  return result;
};
export const logout = async () => {
  const { data } = await instance.delete('/api/auth/sign-out');
  setToken();
  return data;
};
export const getCurrent = async token => {
  try {
    setToken(token);
    const { data } = await instance.get('/api/users/current');
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export const Categories = async token => {
  try {
    setToken(token);
    const { data } = await instance.get('/api/transaction-categories');
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export const addTransaction = async transaction => {
  const { data } = await instance.post('/api/transactions', transaction);
  return data;
};

export const allTransactions = async () => {
  const { data } = await instance.get('/api/transactions');
  return data;
};

export const deleteTransaction = async id => {
  const { data } = await instance.delete(`/api/transactions/${id}`);
  return data;
};

export const getSummary = async period => {
  const { data } = await instance.get(`/api/transactions-summary${period}`);
  return data;
};

export const editTransaction = async id => {
  const { data } = await instance.patch(`/api/transactions/${id}`);
  return data;
};

export default instance;

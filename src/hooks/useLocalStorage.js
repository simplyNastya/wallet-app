import { useEffect, useState } from 'react';

const useLocalStorage = (key, value) => {
  const [state, setState] = useState(() => {
    try {
      const storage = JSON.parse(localStorage.getItem(key));
      return storage ? { ...storage } : value;
    } catch (error) {
      return value;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      return null;
    }
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;

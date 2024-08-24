import { useEffect, useState } from 'react';

export default function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(getWacthedMovies);

  useEffect(() => {
    localStorage.setItem('watchedList', JSON.stringify(value));
  }, [value, setValue]);

  function getWacthedMovies() {
    const storeWatchedList = localStorage.getItem(`${key}`);
    return storeWatchedList ? JSON.parse(storeWatchedList) : initialState;
  }

  return [value, setValue];
}

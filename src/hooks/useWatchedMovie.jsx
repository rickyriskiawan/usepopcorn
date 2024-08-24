import { useEffect, useState } from 'react';

export default function useWatchedMovies() {
  const [watchedList, setWatchedList] = useState(getWacthedMovies);

  useEffect(() => {
    localStorage.setItem('watchedList', JSON.stringify(watchedList));
  }, [watchedList]);

  function getWacthedMovies() {
    const storeWatchedList = localStorage.getItem('watchedList');

    if (!storeWatchedList) {
      return [];
    }

    return JSON.parse(storeWatchedList);
  }

  return { watchedList, setWatchedList };
}

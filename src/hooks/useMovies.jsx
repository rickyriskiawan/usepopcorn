import { useEffect, useState } from 'react';

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

    async function getData() {
      try {
        setError('');
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_KEY_OMDBI}&s=${query})`,
          { signal: abortController.signal }
        );
        const data = await res.json();

        if (data.Response === 'False') {
          setError(data.Error === 'Too many results.' ? '' : data.Error);
        }

        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getData();
    return () => {
      abortController.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}

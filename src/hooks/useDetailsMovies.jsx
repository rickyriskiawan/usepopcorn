import { useEffect, useState } from 'react';

export default function useDetailsMovies(movieId) {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const key = import.meta.env.VITE_KEY_OMDBI;
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movieId}`);
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [movieId]);

  return [movie, isLoading];
}

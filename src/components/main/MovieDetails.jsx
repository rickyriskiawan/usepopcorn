import { useEffect, useState } from 'react';
import StarRating from '../StarRating/StarRating';

export default function MovieDetails({ movieId, setSelectedId }) {
  const [movie, setMovie] = useState({});

  const onBack = () => {
    setSelectedId(null);
  };

  useEffect(() => {
    async function getMovieDetails() {
      const key = import.meta.env.VITE_KEY_OMDBI;
      const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movieId}`, {
        method: 'GET',
        headers: { Accept: '*/*' },
      });
      const data = await res.json();
      setMovie(data);
    }
    getMovieDetails();
  }, [movieId]);

  return (
    <div className='details'>
      <header>
        <button className='btn-back' onClick={onBack}>
          &larr;
        </button>
        <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
        <div className='details-overview'>
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released} &bull; {movie.Runtime}
          </p>
          <p>{movie.Genre}</p>
          <p>{movie.imdbRating}</p>
        </div>
      </header>
      <section>
        <StarRating />
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Staring {movie.Actors}</p>
        <p>Directed by {movie.Director}</p>
      </section>
    </div>
  );
}

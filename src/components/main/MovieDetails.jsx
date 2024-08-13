import { useEffect, useState } from 'react';
import StarRating from '../StarRating/StarRating';
import Loader from '../Loader';

export default function MovieDetails({ movieId, setSelectedId }) {
  const [movie, setMovie] = useState({});
  const [movieRating, setMovieRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  console.log(`ini movie Rating ${movieRating}`);

  const onBack = () => {
    setSelectedId(null);
  };

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

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
            <div className='rating'>
              <StarRating maxRating={10} onSetRating={setMovieRating} size={24} />
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Staring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

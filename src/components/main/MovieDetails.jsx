import { useEffect, useState } from 'react';
import StarRating from '../StarRating/StarRating';
import Loader from '../Loader';
import useEventKeys from '../../hooks/useEventKeys';
import useDetailsMovies from '../../hooks/useDetailsMovies';

export default function MovieDetails({ movieId, setSelectedId, watchedList, setWatchedList }) {
  const [movie, isLoading] = useDetailsMovies(movieId);
  console.log(movie);

  const [movieRating, setMovieRating] = useState(0);
  const isWatched = watchedList.filter((watched) => movie.imdbID === watched.imdbID);

  const handleBack = () => {
    setSelectedId(null);
  };

  useEventKeys(handleBack, handleBack);

  useEffect(() => {
    if (movie.Title === undefined) return;
    document.title = `Movie | ${movie.Title}`;

    return () => (document.title = 'UsePopcorn');
  });

  const handleAddtoWatchedList = () => {
    const newWatchedData = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Poster: movie.Poster,
      imdbRating: parseFloat(movie.imdbRating),
      userRating: movieRating,
      Runtime: parseInt(movie.Runtime.split(' ')[0]),
    };

    setWatchedList([...watchedList, newWatchedData]);
    handleBack();
  };

  const handleRemoveFromWatchedList = () => {
    setWatchedList(watchedList.filter((watched) => movie.imdbID !== watched.imdbID));
    handleBack();
  };

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={handleBack}>
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
              {isWatched.length > 0 ? (
                <>
                  <StarRating
                    maxRating={10}
                    onSetRating={setMovieRating}
                    size={24}
                    defaultRating={isWatched[0].userRating}
                  />
                  <button className='btn-remove' onClick={handleRemoveFromWatchedList}>
                    - Remove From Watched List
                  </button>
                </>
              ) : (
                <>
                  <StarRating maxRating={10} onSetRating={setMovieRating} size={24} />
                  <button className='btn-add' onClick={handleAddtoWatchedList}>
                    + Add to Watched List
                  </button>
                </>
              )}
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

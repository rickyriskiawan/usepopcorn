export default function MovieList({ movies, selectedId, setSelectedId }) {
  const setId = (movieId) => {
    setSelectedId(movieId === selectedId ? null : movieId);
  };
  return (
    <ul className='list list-movies'>
      {movies ? (
        movies.map((movie) => (
          <li onClick={() => setId(movie.imdbID)} key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  );
}

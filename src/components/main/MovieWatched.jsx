export default function MovieWatched({ watchedList }) {
  const average = (arr) => arr.reduce((acc, cur) => acc + cur / arr.length, 0);
  const avgImdbRating = average(watchedList.map((movie) => movie.imdbRating));
  const avgUserRating = average(watchedList.map((movie) => movie.userRating));
  const avgRuntime = average(watchedList.map((movie) => movie.Runtime));

  return (
    <>
      <div className='summary'>
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watchedList.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{parseFloat(avgImdbRating.toFixed(1))}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{parseFloat(avgUserRating).toFixed(1)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{Math.floor(avgRuntime)} min</span>
          </p>
        </div>
      </div>

      <ul className='list'>
        {watchedList.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{movie.Runtime} min</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

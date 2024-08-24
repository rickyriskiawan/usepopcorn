import { useEffect, useState } from 'react';
import Navbar from './components/nav/Navbar';
import Logo from './components/nav/Logo';
import Search from './components/nav/Search';
import SearchResult from './components/nav/SearchResult';
import Main from './components/main/Main';
import BoxMovie from './components/main/BoxMovie';
import MovieList from './components/main/MovieList';
import MovieWatched from './components/main/MovieWatched';
import Error from './components/Error';
import Loader from './components/Loader';
import MovieDetails from './components/main/MovieDetails';
import useMovies from './hooks/useMovies';
import useWatchedMovies from './hooks/useWatchedMovie';

export default function App() {
  const [query, setQuery] = useState('');
  const { movies, isLoading, error } = useMovies(query);
  const { watchedList, setWatchedList } = useWatchedMovies();
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <SearchResult movies={movies} />
      </Navbar>

      <Main>
        <BoxMovie>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} selectedId={selectedId} setSelectedId={setSelectedId} />
          )}
          {error && <Error message={error} />}
        </BoxMovie>

        <BoxMovie>
          {selectedId ? (
            <MovieDetails
              movieId={selectedId}
              setSelectedId={setSelectedId}
              watchedList={watchedList}
              setWatchedList={setWatchedList}
            />
          ) : (
            <MovieWatched watchedList={watchedList} setWatchedList={setWatchedList} />
          )}
        </BoxMovie>
      </Main>
    </>
  );
}

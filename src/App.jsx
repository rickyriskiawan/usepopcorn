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

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

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

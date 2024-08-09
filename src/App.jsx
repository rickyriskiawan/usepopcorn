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
import { tempWatchedData } from './data/tempWatchedData';

export default function App() {
  const [movies, setMovies] = useState('');
  const [query, setQuery] = useState('');
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        setError('');
        const key = import.meta.env.VITE_KEY_OMDBI;
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query})`
        );

        const data = await res.json();
        console.log(data);

        if (data.Response === 'False') {
          setError(data.Error);
        }

        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
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
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <Error message={error} />}
        </BoxMovie>

        <BoxMovie>
          <MovieWatched watched={watched} />
        </BoxMovie>
      </Main>
    </>
  );
}

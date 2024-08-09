export default function SearchResult({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies ? movies.length : 0}</strong> results
    </p>
  );
}

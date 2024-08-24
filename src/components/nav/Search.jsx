import { useEffect, useRef } from 'react';

export default function Search({ query, setQuery }) {
  const inputElement = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputElement.current) {
        return;
      }

      if (e.code === 'Enter') {
        inputElement.current.select();
      }
    }

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [setQuery]);

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onClick={(e) => e.target.select()}
      ref={inputElement}
    />
  );
}

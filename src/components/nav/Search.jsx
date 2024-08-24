import { useEffect, useRef } from 'react';
import useEventKeys from '../../hooks/useEventKeys';

export default function Search({ query, setQuery }) {
  const inputElement = useRef(null);

  useEventKeys(setQuery, (event) => {
    if (document.activeElement === inputElement.current) {
      return;
    }

    if (event.code === 'Enter') {
      inputElement.current.select();
    }
  });

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

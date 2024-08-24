import { useEffect } from 'react';

export default function useEventKeys(dependency, callback) {
  useEffect(() => {
    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, [dependency]);
}

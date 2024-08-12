import { useState } from 'react';
import Star from './Star';
import './starStyle.css';

export default function StarRating({ maxRating = 5 }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  return (
    <div className='container'>
      <div className='star-container'>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            index={i}
            setRating={setRating}
            setTempRating={setTempRating}
            fullStar={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          />
        ))}
      </div>
      <p className='text'>{tempRating ? tempRating : rating}</p>
    </div>
  );
}

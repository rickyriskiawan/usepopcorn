import { useState } from 'react';
import Star from './Star';

export default function StarRating({
  maxRating = 5,
  color = '#fcc419',
  size = 48,
  className = '',
  message = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    onSetRating ? onSetRating(rating) : '';
  };

  const continerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const starContainerStyle = {
    display: 'flex',
    gap: '4px',
  };

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div className={className} style={continerStyle}>
      <div className='' style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            index={i}
            color={color}
            size={size}
            setRating={handleRating}
            setTempRating={setTempRating}
            fullStar={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          />
        ))}
      </div>
      <p className='' style={textStyle}>
        {tempRating ? tempRating : rating}
      </p>
    </div>
  );
}

import React from 'react';

export interface IRating {
  /**
   * Amount of stars
   */
  amount: number;
  /**
   * On rate callback
   */
  onRate: (amount: number) => void;
  /**
   * Alternative class name
   */
  className?: string;
  /**
   * Label for the rating
   */
  label?: {left: string; right: string};
}

const Rating: React.FC<IRating> = ({amount, onRate, className = '', label}) => {
  const [rate, setRate] = React.useState(0);

  const handleClick = (amount: number) => () => {
    setRate(amount);
    onRate(amount);
  };
  return (
    <div className={`rating ${className}`}>
      <div className="rating-container">
        {Array.from({length: amount + 1}, (_, i) => (
          <button
            className={`rating-button ${rate === i ? 'active' : ''}`}
            type="button"
            key={i + 'rating-button'}
            onClick={handleClick(i)}
          >
            {i}
          </button>
        ))}
      </div>
      {label && (
        <div className="rating-label">
          <small>{label.left}</small>
          <small>{label.right}</small>
        </div>
      )}
    </div>
  );
};

export default Rating;

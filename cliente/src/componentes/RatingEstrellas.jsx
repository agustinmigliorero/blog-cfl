import { useState } from "react";

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <span
    className={filled ? "text-warning" : "text-secondary"}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{ cursor: "pointer", fontSize: "2rem" }}
  >
    ★
  </span>
);

const RatingEstrellas = ({ estrellas = 5, rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(estrellas)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            filled={starValue <= (hover || rating)}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
    </div>
  );
};

export default RatingEstrellas;

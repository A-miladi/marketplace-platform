import React from "react";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  // Calculate the number of full stars
  const fullStars = Math.floor(rating);
  // Calculate the fractional part (e.g. 0.2 from 4.2)
  const hasHalfStar = rating - fullStars >= 0.5;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      // Full star
      stars.push(
        <span key={i} className="text-xs text-[#F8B232] lg:text-xl">
          ★
        </span>,
      );
    } else if (i === fullStars && hasHalfStar) {
      // Half star
      stars.push(
        <span key={i} className="text-xs text-[#F8B232] lg:text-xl">
          ☆
        </span>,
      );
    } else {
      // Empty star
      stars.push(
        <span key={i} className="text-xs text-[#E7E7E7] lg:text-xl">
          ★
        </span>,
      );
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default Rating;

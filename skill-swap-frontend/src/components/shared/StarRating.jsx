import React from 'react';

export default function StarRating({ rating, hoverRating, setRating, setHoverRating }) {
    return (
        <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={`h-7 w-7 cursor-pointer transition-colors ${i <= (hoverRating || rating) ? 'text-violet-500' : 'text-gray-300'}`}
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(i)}
                />
            ))}
        </div>
    );
}

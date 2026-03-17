import { Star } from "lucide-react";

export default function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={
            i <= Math.round(rating) ? "fill-gold text-gold" : "text-gray-600"
          }
        />
      ))}
      <span className="ml-1 font-mono text-sm" style={{ color: "var(--gold)" }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

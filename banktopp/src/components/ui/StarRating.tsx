interface StarRatingProps {
  rating: number
  size?: number
}

export default function StarRating({ rating, size = 16 }: StarRatingProps) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    const fill = i <= Math.floor(rating) ? '#F5C842' : i - 0.5 <= rating ? 'url(#half)' : '#2a2a3e'
    stars.push(
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="#F5C842" />
            <stop offset="50%" stopColor="#2a2a3e" />
          </linearGradient>
        </defs>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    )
  }

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} av 5 stjerner`}>
      {stars}
    </div>
  )
}

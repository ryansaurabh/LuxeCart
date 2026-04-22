import { Star } from "lucide-react";

interface Props {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  showCount?: boolean;
}

export default function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
}: Props) {
  const px = size === "sm" ? 14 : 16;
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1.5 text-sm text-muted">
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            size={px}
            className={
              i < full
                ? "fill-accent text-accent"
                : i === full && half
                ? "fill-accent text-accent opacity-60"
                : "text-ink/20"
            }
          />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs">
          {rating.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  );
}

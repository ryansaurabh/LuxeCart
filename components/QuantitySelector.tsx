"use client";

import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: Props) {
  const btnSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const boxSize = size === "sm" ? "h-8 w-10" : "h-10 w-12";
  return (
    <div className="inline-flex items-center rounded-full border border-ink/15">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${btnSize} flex items-center justify-center rounded-l-full transition-colors hover:bg-bg-warm disabled:opacity-40`}
        disabled={value <= min}
      >
        <Minus size={14} />
      </button>
      <div className={`${boxSize} flex items-center justify-center text-sm font-medium`}>
        {value}
      </div>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`${btnSize} flex items-center justify-center rounded-r-full transition-colors hover:bg-bg-warm disabled:opacity-40`}
        disabled={value >= max}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

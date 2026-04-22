"use client";

import { Category } from "@/data/products";

export type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "top-rated"
  | "newest";

interface Props {
  category: Category | "all";
  onCategoryChange: (c: Category | "all") => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  count: number;
}

const categories: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Skincare", value: "skincare" },
  { label: "Body Care", value: "bodycare" },
  { label: "Bundles", value: "bundles" },
];

const sortOptions: { label: string; value: SortKey }[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "top-rated" },
  { label: "Newest", value: "newest" },
];

export default function FilterBar({
  category,
  onCategoryChange,
  sort,
  onSortChange,
  count,
}: Props) {
  return (
    <div className="sticky top-16 z-30 border-b border-ink/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => onCategoryChange(c.value)}
              className={`chip ${
                category === c.value ? "chip-active" : ""
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted">
            Showing {count} {count === 1 ? "product" : "products"}
          </span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="rounded-full border border-ink/15 bg-white px-4 py-1.5 text-xs font-medium outline-none focus:border-ink"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

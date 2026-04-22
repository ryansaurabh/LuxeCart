"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Category, products } from "@/data/products";
import FilterBar, { SortKey } from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";

const VALID_CATEGORIES: ReadonlyArray<Category> = [
  "skincare",
  "bodycare",
  "bundles",
];

function parseCategory(raw: string | null): Category | "all" {
  return VALID_CATEGORIES.includes(raw as Category)
    ? (raw as Category)
    : "all";
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlCategory = parseCategory(searchParams.get("category"));
  const [category, setCategory] = useState<Category | "all">(urlCategory);
  const [sort, setSort] = useState<SortKey>("featured");

  // Sync state when the URL changes (e.g. navbar click while on /shop).
  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  // Keep the URL in sync when the user clicks filter chips.
  const handleCategoryChange = (next: Category | "all") => {
    setCategory(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") params.delete("category");
    else params.set("category", next);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "top-rated":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => {
          const aNew = a.tag === "New" ? 0 : 1;
          const bNew = b.tag === "New" ? 0 : 1;
          return aNew - bNew;
        });
        break;
      default: {
        const order: Record<string, number> = {
          Bestseller: 0,
          Trending: 1,
          "Best Value": 2,
          "Gift Favorite": 3,
          New: 4,
        };
        list.sort(
          (a, b) =>
            (order[a.tag ?? ""] ?? 99) - (order[b.tag ?? ""] ?? 99)
        );
      }
    }
    return list;
  }, [category, sort]);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-2 md:px-8">
        <h1 className="font-display text-4xl md:text-5xl">Shop All</h1>
        <p className="mt-2 text-sm text-muted md:text-base">
          Clean, clinical, and crafted for radiance.
        </p>
      </div>

      <FilterBar
        category={category}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={setSort}
        count={filtered.length}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-muted">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}

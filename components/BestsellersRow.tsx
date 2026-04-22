"use client";

import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function BestsellersRow() {
  const bestsellers = products
    .filter((p) => p.tag === "Bestseller" || p.tag === "Trending")
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="section-title">Bestsellers</h2>
        <Link
          href="/shop"
          className="text-sm font-medium text-ink underline-offset-4 hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
        {bestsellers.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

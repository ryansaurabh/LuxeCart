"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Product, products } from "@/data/products";
import ProductCard from "./ProductCard";

interface Props {
  current: Product;
}

export default function RecommendedProducts({ current }: Props) {
  const [recs, setRecs] = useState<Product[]>([]);
  const [aiPowered, setAiPowered] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchRecs() {
      // Fallback: same category, different product, closest price
      const fallback = products
        .filter((p) => p.id !== current.id)
        .sort((a, b) => {
          const sameCatA = a.category === current.category ? 0 : 1;
          const sameCatB = b.category === current.category ? 0 : 1;
          if (sameCatA !== sameCatB) return sameCatA - sameCatB;
          return (
            Math.abs(a.price - current.price) -
            Math.abs(b.price - current.price)
          );
        })
        .slice(0, 4);

      setRecs(fallback);

      try {
        const res = await fetch("/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: current.id }),
        });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data.ids) && data.ids.length > 0) {
          const aiRecs = data.ids
            .map((id: string) => products.find((p) => p.id === id))
            .filter(
              (p: Product | undefined): p is Product =>
                !!p && p.id !== current.id
            )
            .slice(0, 4);
          if (aiRecs.length > 0) {
            setRecs(aiRecs);
            setAiPowered(true);
          }
        }
      } catch {
        /* fallback already set */
      }
    }

    fetchRecs();
    return () => {
      cancelled = true;
    };
  }, [current.id]);

  if (recs.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-8 flex items-center gap-3">
        <h2 className="section-title">You might also like</h2>
        {aiPowered && (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose px-3 py-1 text-xs font-medium text-ink">
            <Sparkles size={12} /> AI Recommended
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
        {recs.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

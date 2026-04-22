"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-sm text-muted">
        No products match these filters.
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

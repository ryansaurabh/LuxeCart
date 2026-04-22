"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import RatingStars from "./RatingStars";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const [hovered, setHovered] = useState(false);
  const [wished, setWished] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);

  const onSale =
    product.originalPrice && product.originalPrice > product.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openDrawer();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      className="group"
    >
      <Link
        href={`/product/${product.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-bg-warm">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-500 ${
              hovered && product.images[1] ? "opacity-0" : "opacity-100"
            }`}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-opacity duration-500 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Tag */}
          {product.tag && (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium tracking-wide text-ink shadow-sm">
              {product.tag}
            </span>
          )}
          {onSale && (
            <span className="absolute left-3 top-12 rounded-full bg-accent px-3 py-1 text-[11px] font-medium tracking-wide text-white shadow-sm">
              Sale
            </span>
          )}

          {/* Wishlist */}
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
              setWished((v) => !v);
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition-transform hover:scale-105"
          >
            <Heart
              size={16}
              className={wished ? "fill-accent text-accent" : "text-ink"}
            />
          </button>

          {/* Desktop hover add-to-cart */}
          <motion.button
            type="button"
            onClick={handleAdd}
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: hovered ? 0 : 20,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-3 left-3 right-3 hidden md:inline-flex items-center justify-center rounded-full bg-ink py-2.5 text-xs font-medium text-white hover:bg-black/85"
          >
            Add to Cart
          </motion.button>

          {/* Mobile persistent add */}
          <button
            type="button"
            aria-label="Add to cart"
            onClick={handleAdd}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white shadow-md md:hidden"
          >
            <ShoppingBag size={16} />
          </button>
        </div>

        <div className="mt-3 space-y-1.5">
          <h3 className="text-sm font-medium text-ink line-clamp-1">
            {product.name}
          </h3>
          <RatingStars
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {onSale && (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

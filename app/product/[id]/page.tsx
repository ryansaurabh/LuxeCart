"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";
import RatingStars from "@/components/RatingStars";
import QuantitySelector from "@/components/QuantitySelector";
import Accordion from "@/components/Accordion";
import RecommendedProducts from "@/components/RecommendedProducts";
import { useCartStore } from "@/store/cartStore";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const product = getProductById(params.id);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);

  if (!product) return notFound();

  const onSale =
    product.originalPrice && product.originalPrice > product.price;

  const handleAdd = () => {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
    openDrawer();
  };

  const categoryLabel =
    product.category === "bodycare"
      ? "Body Care"
      : product.category === "bundles"
      ? "Bundles"
      : "Skincare";

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-ink"
          >
            {categoryLabel}
          </Link>
          <ChevronRight size={12} />
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ImageGallery images={product.images} alt={product.name} />

          <div>
            {product.tag && (
              <span className="mb-3 inline-block rounded-full bg-rose px-3 py-1 text-xs font-medium">
                {product.tag}
              </span>
            )}
            <h1 className="font-display text-4xl tracking-tight md:text-5xl">
              {product.name}
            </h1>
            <div className="mt-3">
              <RatingStars
                rating={product.rating}
                reviewCount={product.reviewCount}
                size="md"
              />
            </div>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-2xl font-semibold">
                {formatPrice(product.price)}
              </span>
              {onSale && (
                <>
                  <span className="text-base text-muted line-through">
                    {formatPrice(product.originalPrice!)}
                  </span>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                    Save{" "}
                    {Math.round(
                      ((product.originalPrice! - product.price) /
                        product.originalPrice!) *
                        100
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="mt-6 text-xs uppercase tracking-wide text-muted">
              Size: <span className="text-ink">{product.size}</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <motion.button
                type="button"
                onClick={handleAdd}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 rounded-full py-3.5 text-sm font-medium text-white transition-colors ${
                  justAdded ? "bg-success" : "bg-ink hover:bg-black/85"
                }`}
              >
                {justAdded ? (
                  <span className="inline-flex items-center gap-2">
                    <Check size={16} /> Added to Cart
                  </span>
                ) : (
                  "Add to Cart"
                )}
              </motion.button>
            </div>

            <div className="mt-10">
              <Accordion
                items={[
                  {
                    title: "Description",
                    defaultOpen: true,
                    content: <p>{product.longDescription}</p>,
                  },
                  {
                    title: "Key Ingredients",
                    content: <p>{product.ingredients}</p>,
                  },
                  {
                    title: "How to Use",
                    content: <p>{product.howToUse}</p>,
                  },
                  {
                    title: "Shipping & Returns",
                    content: (
                      <p>
                        Free shipping on orders over $50. Returns accepted
                        within 30 days of delivery.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <RecommendedProducts current={product} />
    </>
  );
}

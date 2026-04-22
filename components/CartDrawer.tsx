"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import {
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/utils";
import QuantitySelector from "./QuantitySelector";
import { useEffect } from "react";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.subtotal());
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40"
          onClick={closeDrawer}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="ml-auto flex h-full w-full max-w-[400px] flex-col bg-white shadow-hover"
          >
            <header className="flex items-center justify-between border-b border-ink/10 p-5">
              <h2 className="text-base font-semibold">
                Your Cart{" "}
                <span className="font-normal text-muted">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              </h2>
              <button aria-label="Close cart" onClick={closeDrawer}>
                <X size={20} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg-warm">
                  <ShoppingBag size={22} className="text-muted" />
                </div>
                <div>
                  <p className="font-medium">Your cart is empty</p>
                  <p className="mt-1 text-sm text-muted">
                    Discover something you&apos;ll love.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="btn-primary"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Free shipping meter */}
                <div className="border-b border-ink/10 px-5 py-4">
                  {remaining > 0 ? (
                    <p className="text-xs text-muted">
                      Add {formatPrice(remaining)} more for{" "}
                      <span className="font-medium text-ink">free shipping</span>
                      .
                    </p>
                  ) : (
                    <p className="text-xs font-medium text-success">
                      🎉 You&apos;ve unlocked free shipping!
                    </p>
                  )}
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-warm">
                    <motion.div
                      initial={false}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-accent"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4 py-4 first:pt-0 border-b border-ink/5 last:border-0"
                      >
                        <Link
                          href={`/product/${item.product.id}`}
                          onClick={closeDrawer}
                          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-bg-warm"
                        >
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link
                                href={`/product/${item.product.id}`}
                                onClick={closeDrawer}
                                className="text-sm font-medium line-clamp-2"
                              >
                                {item.product.name}
                              </Link>
                              <p className="mt-0.5 text-xs text-muted">
                                {item.product.size}
                              </p>
                            </div>
                            <button
                              aria-label="Remove item"
                              onClick={() => removeItem(item.product.id)}
                              className="text-muted hover:text-ink"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <QuantitySelector
                              value={item.quantity}
                              onChange={(v) =>
                                updateQuantity(item.product.id, v)
                              }
                              size="sm"
                            />
                            <span className="text-sm font-semibold">
                              {formatPrice(
                                item.product.price * item.quantity
                              )}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <footer className="border-t border-ink/10 p-5">
                  <div className="mb-4 flex items-baseline justify-between">
                    <span className="text-sm text-muted">Subtotal</span>
                    <span className="text-lg font-semibold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeDrawer}
                    className="btn-primary w-full"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={closeDrawer}
                    className="mt-3 w-full text-center text-sm text-muted hover:text-ink"
                  >
                    Continue Shopping
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

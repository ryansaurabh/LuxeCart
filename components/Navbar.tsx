"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Skincare", href: "/shop?category=skincare" },
  { label: "Body Care", href: "/shop?category=bodycare" },
  { label: "Bundles", href: "/shop?category=bundles" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const itemCount = useCartStore((s) => s.itemCount());
  const justAddedId = useCartStore((s) => s.justAddedId);
  const openDrawer = useCartStore((s) => s.openDrawer);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = query
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    if (searchOpen || mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Menu"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
            <Link
              href="/"
              className="font-display text-2xl tracking-tight"
            >
              LuxeCart
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-bg-warm"
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              aria-label="Cart"
              onClick={openDrawer}
              className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-bg-warm"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount + (justAddedId ?? "")}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{
                      scale: justAddedId ? [1, 1.3, 1] : 1,
                      opacity: 1,
                    }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              onClick={(e) => e.stopPropagation()}
              className="h-full w-80 bg-white p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-xl">LuxeCart</span>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-3 text-base hover:bg-bg-warm"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mt-20 max-w-2xl rounded-xl bg-white p-6 shadow-hover"
            >
              <div className="flex items-center gap-3 border-b border-ink/10 pb-3">
                <Search size={20} className="text-muted" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-base outline-none"
                />
                <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <X size={20} />
                </button>
              </div>
              <div className="mt-4 space-y-1">
                {results.length === 0 && query && (
                  <p className="py-6 text-center text-sm text-muted">
                    No products match &ldquo;{query}&rdquo;
                  </p>
                )}
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between rounded-md px-3 py-2.5 hover:bg-bg-warm"
                  >
                    <span>{p.name}</span>
                    <span className="text-sm text-muted">
                      {formatPrice(p.price)}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

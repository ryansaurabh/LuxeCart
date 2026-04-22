"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const cats = [
  {
    label: "Skincare",
    href: "/shop?category=skincare",
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb9?w=1000&q=80&auto=format&fit=crop",
  },
  {
    label: "Body Care",
    href: "/shop?category=bodycare",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1000&q=80&auto=format&fit=crop",
  },
  {
    label: "Bundles",
    href: "/shop?category=bundles",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=1000&q=80&auto=format&fit=crop",
  },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="section-title">Shop by Category</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cats.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              href={c.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-xl"
            >
              <Image
                src={c.image}
                alt={c.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-3xl text-white">
                  {c.label}
                </h3>
                <span className="mt-1 inline-block text-sm text-white/80">
                  Shop now →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

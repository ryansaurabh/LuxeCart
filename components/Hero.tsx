"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1800&q=80&auto=format&fit=crop"
          alt="Luxury skincare on marble surface"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-4 pb-20 text-white md:px-8 md:pb-28">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl"
        >
          Radiance,
          <br />
          Refined.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 max-w-xl text-base text-white/85 md:text-lg"
        >
          Luxury skincare crafted with nature&apos;s finest ingredients.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7"
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-white/90"
          >
            Shop the Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

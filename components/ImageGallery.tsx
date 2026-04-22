"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-bg-warm group">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className={`relative aspect-square overflow-hidden rounded-md bg-bg-warm transition-all ${
              i === index
                ? "ring-2 ring-ink"
                : "opacity-70 hover:opacity-100"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="150px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

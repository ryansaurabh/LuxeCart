"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function SuccessContent() {
  const params = useSearchParams();
  const order = params.get("order") ?? "LC-000000";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center md:px-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success"
      >
        <CheckCircle2 size={36} />
      </motion.div>
      <h1 className="font-display text-4xl md:text-5xl">
        Order Confirmed! 🎉
      </h1>
      <p className="mt-4 text-base text-muted">
        Thanks for shopping with LuxeCart. A confirmation email is on its way.
      </p>
      <div className="mt-8 rounded-xl border border-ink/10 bg-bg-warm px-6 py-4 text-sm">
        Order number:{" "}
        <span className="font-semibold text-ink">{order}</span>
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/shop" className="btn-primary">
          Continue Shopping
        </Link>
        <Link href="/" className="btn-ghost">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-muted">Loading...</div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

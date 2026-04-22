"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-rose">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Join the LuxeCart family</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink/70 md:text-base">
            Get 15% off your first order plus skincare tips from our experts.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input sm:flex-1"
            />
            <button type="submit" className="btn-primary">
              {submitted ? "Subscribed ✓" : "Subscribe"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

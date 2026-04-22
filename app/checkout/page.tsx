"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, generateOrderNumber } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clear = useCartStore((s) => s.clear);

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 8;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;

  const [form, setForm] = useState({
    email: "",
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    payment: "card",
  });
  const [promo, setPromo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateField = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    const orderNumber = generateOrderNumber();
    // Simulate processing
    setTimeout(() => {
      clear();
      router.push(`/checkout/success?order=${orderNumber}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg-warm">
      <header className="border-b border-ink/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-8">
          <Link href="/" className="font-display text-2xl">
            LuxeCart
          </Link>
          <Link
            href="/shop"
            className="text-sm text-muted hover:text-ink"
          >
            ← Back to shop
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <h1 className="mb-8 font-display text-3xl md:text-4xl">Checkout</h1>

        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* Form */}
          <form onSubmit={placeOrder} className="space-y-10">
            <section>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                1. Contact
              </h2>
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="input"
              />
            </section>

            <section>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                2. Shipping address
              </h2>
              <div className="grid gap-3">
                <input
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="input"
                />
                <input
                  required
                  placeholder="Address line 1"
                  value={form.address1}
                  onChange={(e) => updateField("address1", e.target.value)}
                  className="input"
                />
                <input
                  placeholder="Address line 2 (optional)"
                  value={form.address2}
                  onChange={(e) => updateField("address2", e.target.value)}
                  className="input"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className="input"
                  />
                  <input
                    required
                    placeholder="State"
                    value={form.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    className="input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    placeholder="PIN / ZIP code"
                    value={form.pincode}
                    onChange={(e) => updateField("pincode", e.target.value)}
                    className="input"
                  />
                  <input
                    required
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="input"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                3. Payment method
              </h2>
              <div className="space-y-2">
                {[
                  { id: "card", label: "Credit / Debit Card" },
                  { id: "upi", label: "UPI" },
                  { id: "cod", label: "Cash on Delivery" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-colors ${
                      form.payment === opt.id
                        ? "border-ink bg-white"
                        : "border-ink/15 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={form.payment === opt.id}
                      onChange={(e) =>
                        updateField("payment", e.target.value)
                      }
                      className="accent-ink"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">
                No real payment is processed — this is a demo checkout.
              </p>
            </section>

            <button
              type="submit"
              disabled={items.length === 0 || submitting}
              className="btn-primary w-full"
            >
              {submitting
                ? "Placing order..."
                : `Place Order · ${formatPrice(total)}`}
            </button>
          </form>

          {/* Summary */}
          <aside className="h-fit rounded-xl border border-ink/10 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
              Order Summary
            </h2>
            {items.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted">
                Your cart is empty.{" "}
                <Link
                  href="/shop"
                  className="font-medium text-ink underline"
                >
                  Shop now
                </Link>
              </p>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map((it) => (
                    <div
                      key={it.product.id}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-bg-warm">
                        <Image
                          src={it.product.images[0]}
                          alt={it.product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-white">
                          {it.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">
                          {it.product.name}
                        </p>
                        <p className="text-xs text-muted">{it.product.size}</p>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatPrice(it.product.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="my-5 flex items-center gap-2">
                  <input
                    placeholder="Promo code"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="input flex-1 py-2 text-xs"
                  />
                  <button
                    type="button"
                    className="rounded-md border border-ink/15 px-4 py-2 text-xs hover:border-ink"
                  >
                    Apply
                  </button>
                </div>

                <motion.div
                  layout
                  className="space-y-2 border-t border-ink/10 pt-4 text-sm"
                >
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </motion.div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

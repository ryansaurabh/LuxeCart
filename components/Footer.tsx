import Link from "next/link";
import { Instagram, Music2, Pointer } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Skincare", href: "/shop?category=skincare" },
      { label: "Body Care", href: "/shop?category=bodycare" },
      { label: "Bundles", href: "/shop?category=bundles" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "#about" },
      { label: "Ingredients", href: "#" },
      { label: "Sustainability", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-bg-warm">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-8 md:grid-cols-4">
        <div>
          <Link href="/" className="font-display text-2xl">
            LuxeCart
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted">
            Luxury skincare crafted with nature&apos;s finest ingredients.
          </p>
        </div>

        {columns.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-ink">
              {c.title}
            </h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-wide text-ink">
            Follow Us
          </h4>
          <div className="flex items-center gap-3">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Music2, label: "TikTok" },
              { Icon: Pointer, label: "Pinterest" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                aria-label={label}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 hover:border-ink hover:bg-ink hover:text-white transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-ink/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted md:flex-row md:px-8">
          <span>© 2026 LuxeCart. All rights reserved.</span>
          <span>Crafted with care.</span>
        </div>
      </div>
    </footer>
  );
}

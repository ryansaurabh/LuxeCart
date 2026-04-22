# LuxeCart

A premium e-commerce storefront for a fictional skincare brand, featuring a full browse-to-checkout flow and an AI-powered shopping assistant (Google Gemini).

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (cart + chat state)
- Google Generative AI (`@google/generative-ai`) — Gemini 2.0 Flash
- Lucide icons, Inter + Playfair Display via `next/font/google`

## Getting started

```bash
# 1. Install deps
npm install

# 2. Add your Gemini key
cp .env.local.example .env.local
#   then edit .env.local and set GEMINI_API_KEY=...

# 3. Run the dev server
npm run dev
```

Then open http://localhost:3000.

> The chat assistant and AI product recommendations gracefully fall back if no key is present — the site still works, just without AI features.

## What's inside

- **Home** (`/`) — Hero with Ken Burns zoom, bestsellers row, category grid, value strip, newsletter.
- **Shop** (`/shop`) — Category filters, sort dropdown, animated grid, hover image crossfade.
- **Product detail** (`/product/[id]`) — Image gallery, accordion content, quantity selector, "Added to cart" success state, AI-powered **"You might also like"** section.
- **Cart drawer** — Slide-in panel with free-shipping progress bar, quantity editing, and empty state.
- **Checkout** (`/checkout`) — Contact / shipping / payment form with live order summary. Mock order placement → `/checkout/success`.
- **AI shopping assistant** — Floating chat widget (bottom right) that knows the catalog and recommends products. Product names in replies become clickable links.

## File structure

```
app/
  api/chat/route.ts              ← Gemini chat endpoint
  api/recommendations/route.ts   ← AI product recommendations (cached)
  layout.tsx                     ← Navbar + CartDrawer + ChatWidget
  page.tsx                       ← Home
  shop/page.tsx
  product/[id]/page.tsx
  checkout/page.tsx
  checkout/success/page.tsx
components/                      ← Navbar, Hero, ProductCard, CartDrawer, ChatWidget, …
data/products.ts                 ← 12 mock products
store/cartStore.ts
store/chatStore.ts
lib/utils.ts
```

## Notes

- Prices are USD; format via `formatPrice` in `lib/utils.ts`.
- Cart state is in-memory (Zustand). Swap for `persist` middleware if you want session persistence.
- Product images are hosted on Unsplash via remote patterns in `next.config.js`.
- To wire this up to a real store: replace `data/products.ts` with a headless-CMS fetch (Sanity, Shopify Storefront, Strapi) and the checkout handler with Stripe.

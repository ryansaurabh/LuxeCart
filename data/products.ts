export type Category = "skincare" | "bodycare" | "bundles";
export type ProductTag =
  | "Bestseller"
  | "New"
  | "Trending"
  | "Best Value"
  | "Gift Favorite";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  category: Category;
  images: string[];
  rating: number;
  reviewCount: number;
  tag?: ProductTag;
  ingredients: string;
  howToUse: string;
  size: string;
  inStock: boolean;
}

// Consistent, clean product photography via Unsplash.
// Using w=1200&q=80&auto=format&fit=crop for quality/perf.
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

export const products: Product[] = [
  // ────────── SKINCARE ──────────
  {
    id: "p1",
    slug: "midnight-repair-serum",
    name: "Midnight Repair Serum",
    price: 89,
    description:
      "Intensive overnight repair with retinol and hyaluronic acid.",
    longDescription:
      "A nightly reset for tired, dull skin. Encapsulated retinol works while you sleep to smooth fine lines and refine texture, while layered hyaluronic acids restore deep hydration. Wake to a visibly softer, more even complexion.",
    category: "skincare",
    images: [
      img("1620916566398-39f1143ab7be"),
      img("1608248543803-ba4f8c70ae0b"),
      img("1570194065650-d99fb4b8ccb9"),
    ],
    rating: 4.8,
    reviewCount: 128,
    tag: "Bestseller",
    ingredients:
      "Encapsulated Retinol 0.3%, Hyaluronic Acid (3 weights), Squalane, Niacinamide, Peptide Complex, Bisabolol.",
    howToUse:
      "At night, apply 3–4 drops to cleansed skin before moisturizer. Start 2–3x per week and build up. Always follow with SPF in the morning.",
    size: "30ml",
    inStock: true,
  },
  {
    id: "p2",
    slug: "vitamin-c-glow-drops",
    name: "Vitamin C Glow Drops",
    price: 65,
    description: "Brightening serum with 15% vitamin C complex.",
    longDescription:
      "A daily dose of radiance. A stabilized 15% vitamin C complex paired with ferulic acid and vitamin E brightens uneven tone, fades dark spots, and protects against environmental stress.",
    category: "skincare",
    images: [
      img("1612817288484-6f916006741a"),
      img("1599305445671-ac291c95aaa9"),
      img("1571781926291-c477ebfd024b"),
    ],
    rating: 4.7,
    reviewCount: 96,
    tag: "New",
    ingredients:
      "L-Ascorbic Acid 15%, Ferulic Acid, Vitamin E, Sea Buckthorn, Hyaluronic Acid.",
    howToUse:
      "Every morning, press 2–3 drops onto clean skin before moisturizer and SPF.",
    size: "30ml",
    inStock: true,
  },
  {
    id: "p3",
    slug: "hydra-cloud-moisturizer",
    name: "Hydra Cloud Moisturizer",
    price: 54,
    description: "72-hour hydration with ceramide barrier repair.",
    longDescription:
      "Cloud-soft, whipped moisturizer that melts into skin and locks in 72 hours of hydration. A five-ceramide complex reinforces the skin barrier while panthenol calms and soothes.",
    category: "skincare",
    images: [
      img("1556228720-195a672e8a03"),
      img("1598528644866-3215e2f83aa3"),
      img("1556228453-efd6c1ff04f6"),
    ],
    rating: 4.9,
    reviewCount: 214,
    tag: "Bestseller",
    ingredients:
      "5-Ceramide Complex, Panthenol, Glycerin, Squalane, Centella Asiatica, Shea Butter.",
    howToUse:
      "Morning and night, massage a pea-sized amount onto clean, damp skin.",
    size: "50ml",
    inStock: true,
  },
  {
    id: "p4",
    slug: "gentle-enzyme-cleanser",
    name: "Gentle Enzyme Cleanser",
    price: 38,
    description: "pH-balanced daily cleanser for all skin types.",
    longDescription:
      "A silky gel-to-foam cleanser that gently dissolves makeup, SPF, and daily buildup without stripping. Papaya enzymes polish dullness away while amino acids keep the skin barrier balanced.",
    category: "skincare",
    images: [
      img("1608571423902-eed4a5ad8108"),
      img("1570194065650-d99fb4b8ccb9"),
      img("1556228578-dd6f761bd2f8"),
    ],
    rating: 4.6,
    reviewCount: 73,
    ingredients:
      "Papaya Enzymes, Amino Acid Surfactants, Glycerin, Allantoin, Green Tea Extract.",
    howToUse:
      "Morning and night, massage onto damp skin for 30 seconds, then rinse with lukewarm water.",
    size: "150ml",
    inStock: true,
  },

  // ────────── BODY CARE ──────────
  {
    id: "p5",
    slug: "rose-gold-body-oil",
    name: "Rose Gold Body Oil",
    price: 72,
    description:
      "Shimmer-finish nourishing oil with rosehip and jojoba.",
    longDescription:
      "A silky, fast-absorbing body oil with the faintest sheen. Rosehip, jojoba, and marula deeply nourish while mica adds a lit-from-within glow for shoulders, legs, and décolletage.",
    category: "bodycare",
    images: [
      img("1608248543803-ba4f8c70ae0b"),
      img("1620916566398-39f1143ab7be"),
      img("1599305445671-ac291c95aaa9"),
    ],
    rating: 4.8,
    reviewCount: 89,
    tag: "Trending",
    ingredients:
      "Rosehip Oil, Jojoba Oil, Marula Oil, Vitamin E, Mineral Mica, Rose Absolute.",
    howToUse:
      "Warm a few drops between palms and press onto damp skin after showering.",
    size: "100ml",
    inStock: true,
  },
  {
    id: "p6",
    slug: "sea-salt-body-scrub",
    name: "Sea Salt Body Scrub",
    price: 42,
    description:
      "Exfoliating scrub with Dead Sea minerals and coconut oil.",
    longDescription:
      "A twice-weekly ritual that polishes away dull, rough skin. Fine Dead Sea salts exfoliate, while coconut and sweet almond oils leave skin cashmere-soft.",
    category: "bodycare",
    images: [
      img("1570194065650-d99fb4b8ccb9"),
      img("1556228578-dd6f761bd2f8"),
      img("1608248543803-ba4f8c70ae0b"),
    ],
    rating: 4.5,
    reviewCount: 61,
    ingredients:
      "Dead Sea Salt, Coconut Oil, Sweet Almond Oil, Vitamin E, Vanilla Extract.",
    howToUse:
      "In the shower, massage onto damp skin in circular motions. Rinse thoroughly. Use 2–3x weekly.",
    size: "200ml",
    inStock: true,
  },
  {
    id: "p7",
    slug: "silk-body-lotion",
    name: "Silk Body Lotion",
    price: 48,
    description: "Fast-absorbing daily moisturizer with shea butter.",
    longDescription:
      "The daily body lotion you'll actually finish. A lightweight silk-finish formula with shea butter and glycerin that sinks in quickly and keeps skin soft from morning to night.",
    category: "bodycare",
    images: [
      img("1556228720-195a672e8a03"),
      img("1598528644866-3215e2f83aa3"),
      img("1612817288484-6f916006741a"),
    ],
    rating: 4.7,
    reviewCount: 105,
    ingredients:
      "Shea Butter, Glycerin, Niacinamide, Panthenol, Sweet Almond Oil.",
    howToUse: "Apply generously to clean, dry skin daily.",
    size: "300ml",
    inStock: true,
  },
  {
    id: "p8",
    slug: "lavender-sleep-cream",
    name: "Lavender Sleep Cream",
    price: 56,
    description:
      "Calming body cream with lavender and chamomile.",
    longDescription:
      "A slow, grounding end to the day. Rich body cream infused with French lavender and chamomile helps you wind down while nourishing dry, tired skin overnight.",
    category: "bodycare",
    images: [
      img("1608571423902-eed4a5ad8108"),
      img("1556228453-efd6c1ff04f6"),
      img("1571781926291-c477ebfd024b"),
    ],
    rating: 4.6,
    reviewCount: 82,
    tag: "New",
    ingredients:
      "Lavender Essential Oil, Chamomile Extract, Shea Butter, Oat Lipids, Magnesium.",
    howToUse:
      "Massage onto arms, legs, and chest before bed. Breathe deeply.",
    size: "200ml",
    inStock: true,
  },

  // ────────── BUNDLES & SETS ──────────
  {
    id: "p9",
    slug: "the-glow-kit",
    name: "The Glow Kit",
    price: 159,
    originalPrice: 208,
    description: "Cleanser + Vitamin C Drops + Moisturizer.",
    longDescription:
      "The complete AM routine for brighter, more even skin. Includes full-sized Gentle Enzyme Cleanser, Vitamin C Glow Drops, and Hydra Cloud Moisturizer.",
    category: "bundles",
    images: [
      img("1571781926291-c477ebfd024b"),
      img("1612817288484-6f916006741a"),
      img("1556228720-195a672e8a03"),
    ],
    rating: 4.9,
    reviewCount: 156,
    tag: "Best Value",
    ingredients:
      "Contains full-sized Cleanser, Vitamin C Serum, and Moisturizer. See individual product pages for ingredient lists.",
    howToUse:
      "Morning: cleanse, 2 drops Vitamin C, moisturize. Night: cleanse and moisturize.",
    size: "Full-size set",
    inStock: true,
  },
  {
    id: "p10",
    slug: "self-care-sunday-set",
    name: "Self-Care Sunday Set",
    price: 129,
    originalPrice: 166,
    description: "Body Scrub + Body Oil + Sleep Cream.",
    longDescription:
      "A weekend ritual in a box. Polish with Sea Salt Body Scrub, glow with Rose Gold Body Oil, and drift off with Lavender Sleep Cream.",
    category: "bundles",
    images: [
      img("1570194065650-d99fb4b8ccb9"),
      img("1608248543803-ba4f8c70ae0b"),
      img("1608571423902-eed4a5ad8108"),
    ],
    rating: 4.8,
    reviewCount: 93,
    ingredients:
      "Contains full-sized Sea Salt Body Scrub, Rose Gold Body Oil, and Lavender Sleep Cream.",
    howToUse:
      "Scrub in the shower, oil on damp skin, sleep cream before bed.",
    size: "Full-size set",
    inStock: true,
  },
  {
    id: "p11",
    slug: "complete-routine-box",
    name: "Complete Routine Box",
    price: 289,
    originalPrice: 392,
    description: "All 8 individual products in a luxury gift box.",
    longDescription:
      "The full LuxeCart library, wrapped in a keepsake box. Every serum, every cleanser, every body ritual — an unforgettable gift or the ultimate treat for yourself.",
    category: "bundles",
    images: [
      img("1599305445671-ac291c95aaa9"),
      img("1612817288484-6f916006741a"),
      img("1570194065650-d99fb4b8ccb9"),
    ],
    rating: 5.0,
    reviewCount: 47,
    tag: "Gift Favorite",
    ingredients:
      "Contains all 8 individual LuxeCart products at full size.",
    howToUse:
      "Start with cleanser and moisturizer. Layer in serums, body care, and sleep cream as you build your routine.",
    size: "Full-size collection",
    inStock: true,
  },
  {
    id: "p12",
    slug: "mini-discovery-set",
    name: "Mini Discovery Set",
    price: 49,
    description: "Travel-size versions of our top 4 products.",
    longDescription:
      "The perfect introduction — or your next carry-on essential. Travel-friendly sizes of Midnight Repair Serum, Vitamin C Glow Drops, Hydra Cloud Moisturizer, and Silk Body Lotion.",
    category: "bundles",
    images: [
      img("1556228578-dd6f761bd2f8"),
      img("1598528644866-3215e2f83aa3"),
      img("1556228453-efd6c1ff04f6"),
    ],
    rating: 4.7,
    reviewCount: 134,
    tag: "Bestseller",
    ingredients:
      "Travel-size versions of our bestselling Serum, Vitamin C, Moisturizer, and Body Lotion.",
    howToUse:
      "Use as you would the full sizes — perfect for travel or first-time trial.",
    size: "4 x travel-size",
    inStock: true,
  },
];

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: Category) =>
  products.filter((p) => p.category === category);

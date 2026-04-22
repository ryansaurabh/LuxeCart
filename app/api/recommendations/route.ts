import { GoogleGenerativeAI } from "@google/generative-ai";
import { products, getProductById } from "@/data/products";

export const runtime = "nodejs";

// Simple in-memory cache keyed by productId.
const cache = new Map<string, { ids: string[]; at: number }>();
const TTL = 1000 * 60 * 60; // 1 hour

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  const { productId } = (await req.json()) as { productId: string };
  const product = getProductById(productId);

  if (!product) {
    return Response.json({ ids: [] }, { status: 400 });
  }

  const cached = cache.get(productId);
  if (cached && Date.now() - cached.at < TTL) {
    return Response.json({ ids: cached.ids });
  }

  if (!apiKey) {
    return Response.json({ ids: [] });
  }

  try {
    const catalog = products
      .map((p) => `${p.id} | ${p.name} | $${p.price} | ${p.category}`)
      .join("\n");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `A customer is viewing "${product.name}" (id: ${product.id}) which is a ${product.category} product priced at $${product.price}.
Suggest 4 complementary products from this catalog (excluding the current product). Favor items that pair well as a routine or gift, and include at least one different-category item when sensible.

Catalog (id | name | price | category):
${catalog}

Return ONLY a JSON array of 4 product IDs, like: ["p1","p2","p3","p4"]. No prose, no code fences.`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    // Extract JSON array even if the model wraps it.
    const match = raw.match(/\[[\s\S]*?\]/);
    if (!match) {
      return Response.json({ ids: [] });
    }
    const parsed = JSON.parse(match[0]);
    if (!Array.isArray(parsed)) {
      return Response.json({ ids: [] });
    }
    const ids = parsed
      .filter((id): id is string => typeof id === "string")
      .filter((id) => id !== product.id && products.some((p) => p.id === id))
      .slice(0, 4);

    cache.set(productId, { ids, at: Date.now() });
    return Response.json({ ids });
  } catch (err) {
    console.error("recommendations error", err);
    return Response.json({ ids: [] });
  }
}

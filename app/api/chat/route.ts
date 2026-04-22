import { GoogleGenerativeAI } from "@google/generative-ai";
import { products } from "@/data/products";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        message:
          "The shopping assistant isn't configured yet. Please add a GEMINI_API_KEY to enable it.",
      },
      { status: 200 }
    );
  }

  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };
    if (!messages || messages.length === 0) {
      return Response.json({ message: "Hi! How can I help?" });
    }

    const catalog = products
      .map(
        (p) =>
          `- ${p.name} ($${p.price}${
            p.originalPrice ? `, was $${p.originalPrice}` : ""
          }): ${p.description} Rating ${p.rating}/5 (${p.reviewCount} reviews)${
            p.tag ? `. Tag: ${p.tag}` : ""
          }. Category: ${p.category}.`
      )
      .join("\n");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `You are LuxeCart's AI shopping assistant on a premium skincare e-commerce website. You help customers find the right products for their skin concerns.

Available products in our store:
${catalog}

Your personality: Warm, knowledgeable about skincare, helpful like a beauty consultant. Keep responses concise (2-3 sentences max).

When recommending products:
- Ask about their skin type or concern first if they haven't mentioned it
- Recommend specific products from the catalog above by exact name
- Mention the price and why it's good for their concern
- If they want a deal, suggest the bundles
- You can suggest a routine (cleanser → serum → moisturizer)

If asked something unrelated to skincare or our products, politely redirect to how you can help them shop.

IMPORTANT: Only recommend products that exist in the catalog above. Never invent products.`,
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const last = messages[messages.length - 1].content;
    const result = await chat.sendMessage(last);
    const text = result.response.text();

    return Response.json({ message: text });
  } catch (err) {
    console.error("chat route error", err);
    return Response.json(
      {
        message:
          "I'm having a little trouble right now. Please try again in a moment!",
      },
      { status: 200 }
    );
  }
}

import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const body = await request.json();
    const topic = (body.topic || "MOH DHA exam training").trim();
    const discount = (body.discount || "15%").trim();
    const type = body.type || "promotional"; // promotional, holiday, informative

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const prompt = `You are a professional conversion copywriter for a premium medical licensing exam training centre called "Unique Mentors" based in Kochi.
Create 3 highly compelling, concise website top-bar announcement banner messages (under 100 characters each).
The banner messages should target healthcare professionals (lab technicians, pharmacists, nurses, doctors) looking to work in the GCC (UAE, Saudi, Qatar) or Western countries (Ireland, Canada, Australia).

Input Parameters:
- Topic/Holiday/Event: ${topic}
- Discount/Promo Offer: ${discount}
- Tone/Type: ${type}

Output format must be exactly 3 plain text lines, each starting with the line number. Do not include markdown code block syntax, quotes, or introduction. Example:
1. Message 1
2. Message 2
3. Message 3`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          }
        );

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const lines = text
            .split("\n")
            .map((line: string) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((line: string) => line.length > 0)
            .slice(0, 3);

          if (lines.length === 3) {
            return ok({ variations: lines });
          }
        }
      } catch (e) {
        console.error("Gemini API call failed, falling back to local generation", e);
      }
    }

    // High quality template-based local fallback
    const variations = generateLocalVariations(topic, discount, type);
    return ok({ variations });
  } catch (error) {
    console.error("generate-announcement error", error);
    return fail("Unable to generate announcements", 500);
  }
}

function generateLocalVariations(topic: string, discount: string, type: string) {
  const normTopic = topic.toLowerCase();
  const discStr = discount ? `FLAT ${discount}` : "Special";

  if (normTopic.includes("new year") || normTopic.includes("diwali") || normTopic.includes("eid") || normTopic.includes("holiday") || normTopic.includes("christmas")) {
    return [
      `🎉 ${topic} Special! Save ${discount} on all MOH, DHA & CORU licensing courses. Limited seats!`,
      `✨ Holiday Offer: Get ${discount} off on our premium medical licensing prep packages!`,
      `📢 ${topic} Celebration: Free Dataflow check + ${discStr} discount on training batches!`
    ];
  }

  if (type === "counselling" || normTopic.includes("counselling") || normTopic.includes("consultation")) {
    return [
      `🌟 Free 1-on-1 overseas career counselling slot open! Book your verification roadmap today.`,
      `📅 Target UAE, Ireland or Canada? Claim your free eligibility assessment slot now!`,
      `🚀 Start your global healthcare journey: Get expert licensing guidance for DHA/MOH/CORU.`
    ];
  }

  return [
    `🎓 Dream of working abroad? Save ${discount} on our premium licensing exam prep batches!`,
    `🚀 New Batch Alert: Flat ${discount} off on GCC & Western country licensing packages. Enroll now!`,
    `💡 Pass your MOH/DHA/CORU exam on the first try. Sign up today and get ${discount} discount!`
  ];
}

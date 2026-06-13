import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { sendNewsletterEmail } from "@/lib/email";
import { newsletterCampaignSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderCampaignContent(content: string) {
  return escapeHtml(content)
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const payload = newsletterCampaignSchema.parse(await request.json());
    const subscribers = await prisma.newsletter.findMany({
      where: { subscribed: true },
      select: { email: true }
    });
    const emails = subscribers.map((subscriber) => subscriber.email);

    if (!emails.length) return fail("No active subscribers to send this campaign to.", 400);

    const result = await sendNewsletterEmail(emails, payload.subject, renderCampaignContent(payload.content));
    if (!result.delivered) return fail(result.reason || "Email transport is not configured.", 500);

    return ok({ sent: emails.length, provider: result.provider, id: result.id }, `Newsletter sent to ${emails.length} subscribers.`);
  } catch (error) {
    console.error("newsletter campaign error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid campaign data", 422);
    return fail("Unable to send newsletter campaign", 500);
  }
}

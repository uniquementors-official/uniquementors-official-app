import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { readAnalyticsContext, recordAnalyticsEvent } from "@/lib/analytics-server";
import { sendApplicationEmail } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { applicationSchema } from "@/lib/validators";
import { generateReferenceNumber } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`apply:${ip}`, 5, 60 * 60 * 1000);
    if (!limited.allowed) return fail("Too many applications from this connection. Please try again later.", 429);

    const body = await request.json();
    const payload = applicationSchema.parse(body);
    const analytics = readAnalyticsContext(body);
    const referenceNumber = generateReferenceNumber("UMA");
    const lead = await prisma.lead.create({
      data: {
        referenceNumber,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        location: payload.location,
        profession: payload.profession,
        experience: payload.experience,
        examType: payload.examType,
        targetCountry: payload.targetCountry,
        message: payload.message || undefined,
        source: "APPLY",
        status: "NEW"
      }
    });

    await recordAnalyticsEvent({
      eventName: "lead_created",
      request,
      distinctId: analytics.distinctId,
      sessionId: analytics.sessionId,
      path: analytics.path,
      referrer: analytics.referrer,
      forwardToPostHog: true,
      properties: {
        leadId: lead.id,
        referenceNumber,
        source: "APPLY",
        examType: payload.examType,
        targetCountry: payload.targetCountry,
        profession: payload.profession,
        email: payload.email,
        phone: payload.phone,
        name: payload.name
      }
    });

    await sendApplicationEmail({ ...payload, referenceNumber });
    return ok({ id: lead.id, referenceNumber }, "Application submitted successfully.");
  } catch (error) {
    console.error("apply route error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid application data", 422);
    return fail("Unable to submit application", 500);
  }
}

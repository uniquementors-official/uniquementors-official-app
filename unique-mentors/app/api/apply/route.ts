import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { readAnalyticsContext, recordAnalyticsEvent } from "@/lib/analytics-server";
import { sendApplicationEmail } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { applicationSchema, studyAbroadApplicationSchema } from "@/lib/validators";
import { validateFormProtection } from "@/lib/form-protection";
import { generateReferenceNumber } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`apply:${ip}`, 5, 60 * 60 * 1000);
    if (!limited.allowed) return fail("Too many applications from this connection. Please try again later.", 429);

    const body = await request.json();
    const protectionError = validateFormProtection(body);
    if (protectionError) return fail(protectionError, 400);
    const analytics = readAnalyticsContext(body);
    const referenceNumber = generateReferenceNumber("UMA");
    if (body.applicationType === "STUDY_ABROAD") {
      const payload = studyAbroadApplicationSchema.parse(body);
      const lead = await prisma.lead.create({
        data: {
          referenceNumber,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          location: payload.location,
          profession: payload.qualification,
          qualification: payload.qualification,
          examType: "STUDY_ABROAD",
          targetCountry: payload.targetCountry,
          source: "STUDY_ABROAD",
          status: "NEW"
        }
      });
      await recordAnalyticsEvent({
        eventName: "lead_created", request, distinctId: analytics.distinctId, sessionId: analytics.sessionId, path: analytics.path, referrer: analytics.referrer, forwardToPostHog: true,
        properties: { leadId: lead.id, referenceNumber, source: "STUDY_ABROAD", applicationType: "STUDY_ABROAD", examType: "STUDY_ABROAD", targetCountry: payload.targetCountry, profession: payload.qualification, email: payload.email, phone: payload.phone, name: payload.name }
      });
      await sendApplicationEmail({ ...payload, profession: payload.qualification, qualification: payload.qualification, examType: "STUDY_ABROAD", applicationType: "STUDY_ABROAD", referenceNumber });
      return ok({ id: lead.id, referenceNumber }, "Study Abroad application submitted successfully.");
    }

    const payload = applicationSchema.parse(body);
    const lead = await prisma.lead.create({
      data: {
        referenceNumber, name: payload.name, email: payload.email, phone: payload.phone, location: payload.location,
        profession: payload.profession, experience: payload.experience, examType: payload.examType, targetCountry: payload.targetCountry,
        message: payload.message || undefined, source: "APPLY", status: "NEW"
      }
    });
    await recordAnalyticsEvent({
      eventName: "lead_created", request, distinctId: analytics.distinctId, sessionId: analytics.sessionId, path: analytics.path, referrer: analytics.referrer, forwardToPostHog: true,
      properties: { leadId: lead.id, referenceNumber, source: "APPLY", applicationType: "MEDICAL_TRAINING", examType: payload.examType, targetCountry: payload.targetCountry, profession: payload.profession, email: payload.email, phone: payload.phone, name: payload.name }
    });
    await sendApplicationEmail({ ...payload, applicationType: "MEDICAL_TRAINING", referenceNumber });
    return ok({ id: lead.id, referenceNumber }, "Application submitted successfully.");
  } catch (error) {
    console.error("apply route error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid application data", 422);
    return fail("Unable to submit application", 500);
  }
}

import { ZodError, z } from "zod";
import type { Prisma } from "@prisma/client";
import { fail, ok } from "@/lib/api";
import { recordAnalyticsEvent } from "@/lib/analytics-server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const analyticsEventSchema = z.object({
  eventName: z.string().min(1).max(120),
  distinctId: z.string().min(1).max(160),
  sessionId: z.string().max(160).optional(),
  path: z.string().max(500).optional(),
  referrer: z.string().max(500).optional(),
  properties: z.record(z.unknown()).optional()
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`analytics:${ip}`, 600, 60 * 60 * 1000);
    if (!limited.allowed) return ok({ skipped: true }, "Analytics rate limited.");

    const payload = analyticsEventSchema.parse(await request.json());
    await recordAnalyticsEvent({
      eventName: payload.eventName,
      request,
      distinctId: payload.distinctId,
      sessionId: payload.sessionId,
      path: payload.path,
      referrer: payload.referrer,
      properties: payload.properties as Prisma.InputJsonValue | undefined
    });

    return ok({ tracked: true });
  } catch (error) {
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid analytics payload", 422);
    console.error("analytics track error", error);
    return ok({ skipped: true }, "Analytics skipped.");
  }
}

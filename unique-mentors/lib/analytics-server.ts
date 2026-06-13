import { createHash } from "crypto";
import { PostHog } from "posthog-node";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getClientIp } from "@/lib/rate-limit";

type AnalyticsContext = {
  distinctId?: string;
  sessionId?: string;
  path?: string;
  referrer?: string;
};

type AnalyticsEventInput = {
  eventName: string;
  request?: Request;
  distinctId?: string;
  sessionId?: string;
  path?: string;
  referrer?: string;
  properties?: Prisma.InputJsonValue;
  forwardToPostHog?: boolean;
};

function hashValue(value?: string | null) {
  if (!value) return undefined;
  return createHash("sha256").update(value).digest("hex");
}

function sanitizeDistinctId(value?: string | null) {
  if (!value) return undefined;
  return value.trim().slice(0, 160);
}

export function readAnalyticsContext(payload: unknown): AnalyticsContext {
  if (!payload || typeof payload !== "object") return {};
  const analytics = (payload as { analytics?: unknown }).analytics;
  if (!analytics || typeof analytics !== "object") return {};
  const record = analytics as Record<string, unknown>;

  return {
    distinctId: typeof record.distinctId === "string" ? record.distinctId : undefined,
    sessionId: typeof record.sessionId === "string" ? record.sessionId : undefined,
    path: typeof record.path === "string" ? record.path : undefined,
    referrer: typeof record.referrer === "string" ? record.referrer : undefined
  };
}

export async function recordAnalyticsEvent({
  eventName,
  request,
  distinctId,
  sessionId,
  path,
  referrer,
  properties,
  forwardToPostHog = false
}: AnalyticsEventInput) {
  const ip = request ? getClientIp(request) : undefined;
  const userAgent = request?.headers.get("user-agent") ?? undefined;
  const fallbackDistinctId = ip || userAgent ? `server:${hashValue(`${ip ?? ""}:${userAgent ?? ""}`)}` : "server:anonymous";
  const resolvedDistinctId = sanitizeDistinctId(distinctId) ?? fallbackDistinctId;

  try {
    await prisma.analyticsEvent.create({
      data: {
        eventName: eventName.slice(0, 120),
        distinctId: resolvedDistinctId,
        sessionId: sessionId?.slice(0, 160),
        path: path?.slice(0, 500),
        referrer: referrer?.slice(0, 500),
        ipHash: hashValue(ip),
        userAgent: userAgent?.slice(0, 500),
        properties: properties ?? undefined
      }
    });
  } catch (error) {
    console.error("analytics mirror error", error);
  }

  if (forwardToPostHog) {
    const eventProperties =
      properties && typeof properties === "object" && !Array.isArray(properties)
        ? (properties as Record<string, unknown>)
        : {};

    await capturePostHogServerEvent({
      eventName,
      distinctId: resolvedDistinctId,
      properties: {
        ...eventProperties,
        path,
        referrer,
        source: "server"
      }
    });
  }
}

async function capturePostHogServerEvent({
  eventName,
  distinctId,
  properties
}: {
  eventName: string;
  distinctId: string;
  properties?: Record<string, unknown>;
}) {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!token || !host) return;

  const client = new PostHog(token, { host });
  try {
    client.capture({
      distinctId,
      event: eventName,
      properties
    });
    await client.shutdown();
  } catch (error) {
    console.error("posthog server capture error", error);
  }
}

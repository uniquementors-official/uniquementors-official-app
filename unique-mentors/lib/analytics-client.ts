"use client";

import posthog from "posthog-js";

type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

const distinctKey = "um_analytics_distinct_id";
const sessionKey = "um_analytics_session_id";

function createId(prefix: string) {
  const value = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}_${value}`;
}

function readStorage(storage: Storage | undefined, key: string) {
  try {
    return storage?.getItem(key) || undefined;
  } catch {
    return undefined;
  }
}

function writeStorage(storage: Storage | undefined, key: string, value: string) {
  try {
    storage?.setItem(key, value);
  } catch {
    // Storage can be disabled by privacy settings.
  }
}

export function getAnalyticsContext() {
  if (typeof window === "undefined") {
    return {
      distinctId: "server:unknown",
      sessionId: "session:unknown",
      path: undefined,
      referrer: undefined
    };
  }

  const posthogDistinctId = typeof posthog.get_distinct_id === "function" ? posthog.get_distinct_id() : undefined;
  const storedDistinctId = readStorage(window.localStorage, distinctKey);
  const distinctId = posthogDistinctId || storedDistinctId || createId("visitor");
  const sessionId = readStorage(window.sessionStorage, sessionKey) || createId("session");

  writeStorage(window.localStorage, distinctKey, distinctId);
  writeStorage(window.sessionStorage, sessionKey, sessionId);

  return {
    distinctId,
    sessionId,
    path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || undefined
  };
}

export function trackAnalyticsEvent(eventName: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;
  const context = getAnalyticsContext();
  const payload = {
    eventName,
    ...context,
    properties: {
      ...properties,
      path: context.path,
      referrer: context.referrer
    }
  };

  posthog.capture(eventName, payload.properties);

  const body = JSON.stringify(payload);
  if ("sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics/track", blob);
    return;
  }

  void fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true
  }).catch(() => {
    // Analytics should never interrupt a user action.
  });
}

export function identifyAnalyticsUser({
  email,
  name,
  phone,
  profession,
  examType,
  source
}: {
  email?: string | null;
  name?: string | null;
  phone?: string | null;
  profession?: string | null;
  examType?: string | null;
  source?: string;
}) {
  if (typeof window === "undefined" || !email) return;
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return;

  const traits = {
    email: normalizedEmail,
    name: name || undefined,
    phone: phone || undefined,
    profession: profession || undefined,
    examType: examType || undefined,
    source
  };

  posthog.identify(normalizedEmail, traits);

  void fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName: "user_identified",
      ...getAnalyticsContext(),
      properties: traits
    }),
    keepalive: true
  }).catch(() => {
    // Identification should never interrupt the user.
  });
}

export function trackPageView(path: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;
  const context = getAnalyticsContext();
  const currentUrl = window.location.href;
  const pageProperties = {
    ...properties,
    path,
    title: document.title,
    referrer: context.referrer,
    current_url: currentUrl
  };

  posthog.capture("$pageview", {
    $current_url: currentUrl,
    ...pageProperties
  });

  const body = JSON.stringify({
    eventName: "page_viewed",
    ...context,
    path,
    properties: pageProperties
  });

  if ("sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics/track", blob);
    return;
  }

  void fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true
  }).catch(() => {
    // Analytics should never interrupt navigation.
  });
}

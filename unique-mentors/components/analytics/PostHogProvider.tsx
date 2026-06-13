"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { trackAnalyticsEvent, trackPageView } from "@/lib/analytics-client";

let posthogInitialized = false;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!token || !host || posthogInitialized) return;

    posthog.init(token, {
      api_host: host,
      capture_pageview: false,
      autocapture: true,
      persistence: "localStorage+cookie"
    });
    posthogInitialized = true;
  }, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;
      if (!target?.dataset.analyticsEvent) return;

      trackAnalyticsEvent(target.dataset.analyticsEvent, {
        label: target.dataset.analyticsLabel,
        location: target.dataset.analyticsLocation,
        href: target instanceof HTMLAnchorElement ? target.href : target.getAttribute("href")
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageViewTracker />
      </Suspense>
      {children}
    </>
  );
}

function PostHogPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    trackPageView(path);
  }, [pathname, searchParams]);

  return null;
}

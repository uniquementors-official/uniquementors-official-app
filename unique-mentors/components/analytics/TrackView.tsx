"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics-client";

type TrackViewProps = {
  eventName: string;
  properties?: Record<string, string | number | boolean | null | undefined>;
};

export function TrackView({ eventName, properties = {} }: TrackViewProps) {
  useEffect(() => {
    trackAnalyticsEvent(eventName, properties);
  }, [eventName, properties]);

  return null;
}

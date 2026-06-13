import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";

export const dynamic = "force-dynamic";

const dayMs = 24 * 60 * 60 * 1000;
const leadEvents = new Set(["contact_form_submitted", "application_submitted", "lead_created"]);
const ctaEvents = new Set([
  "cta_clicked",
  "whatsapp_clicked",
  "login_clicked",
  "signup_clicked",
  "app_store_clicked",
  "play_store_clicked",
  "phone_clicked",
  "newsletter_subscribed"
]);

type AnalyticsRecord = {
  id: string;
  eventName: string;
  distinctId: string;
  sessionId: string | null;
  path: string | null;
  referrer: string | null;
  properties: Prisma.JsonValue | null;
  createdAt: Date;
};

function jsonRecord(value: Prisma.JsonValue | null): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function textProperty(event: AnalyticsRecord, key: string) {
  const value = jsonRecord(event.properties)[key];
  return typeof value === "string" && value.trim() ? value : undefined;
}

function knownUserLabel(event: AnalyticsRecord) {
  const name = textProperty(event, "name");
  const email = textProperty(event, "email");
  const phone = textProperty(event, "phone");
  if (name && email) return `${name} (${email})`;
  return email || phone || name || event.distinctId;
}

function knownUserKey(event: AnalyticsRecord) {
  const name = textProperty(event, "name");
  const email = textProperty(event, "email");
  const phone = textProperty(event, "phone");
  if (!name && !email && !phone) return undefined;
  return [name, email, phone].filter(Boolean).join(" / ");
}

function countBy<T extends string>(items: T[]) {
  return items.reduce<Record<T, number>>(
    (counts, item) => {
      counts[item] = (counts[item] ?? 0) + 1;
      return counts;
    },
    {} as Record<T, number>
  );
}

function topEntries(counts: Record<string, number>, limit = 6) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function uniqueVisitors(events: AnalyticsRecord[], predicate: (event: AnalyticsRecord) => boolean) {
  return new Set(events.filter(predicate).map((event) => event.distinctId)).size;
}

function percent(value: number, total: number) {
  if (!total) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

function sourceFromReferrer(referrer?: string | null) {
  if (!referrer) return "Direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (host.includes("google")) return "Google";
    if (host.includes("facebook") || host.includes("instagram") || host.includes("linkedin") || host.includes("youtube")) return "Social";
    if (host.includes("uniquementors")) return "Internal";
    return host;
  } catch {
    return "Other";
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata"
  }).format(date);
}

export default async function AdminAnalyticsPage() {
  const since = new Date(Date.now() - 30 * dayMs);
  const events = await prisma.analyticsEvent.findMany({
    where: { createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
    take: 10000
  });

  const visitors = new Set(events.map((event) => event.distinctId)).size;
  const sessions = new Set(events.map((event) => event.sessionId).filter(Boolean)).size;
  const pageViews = events.filter((event) => event.eventName === "page_viewed").length;
  const leads = events.filter((event) => leadEvents.has(event.eventName)).length;
  const ctaClicks = events.filter((event) => ctaEvents.has(event.eventName)).length;

  const topPages = topEntries(
    countBy(
      events
        .filter((event) => event.eventName === "page_viewed")
        .map((event) => event.path || textProperty(event, "path") || "/")
    )
  );
  const topEventRows = topEntries(countBy(events.map((event) => event.eventName)));
  const sourceRows = topEntries(countBy(events.map((event) => sourceFromReferrer(event.referrer || textProperty(event, "referrer")))));
  const knownUserRows = topEntries(
    countBy(events.map((event) => knownUserKey(event)).filter((value): value is string => Boolean(value))),
    8
  );
  const segmentRows = topEntries(
    countBy(
      events
        .map((event) => textProperty(event, "examType") || textProperty(event, "filter") || textProperty(event, "category"))
        .filter((value): value is string => Boolean(value && value !== "All"))
    ),
    8
  );

  const funnel = [
    {
      label: "Visited website",
      count: uniqueVisitors(events, (event) => event.eventName === "page_viewed"),
      hint: "Unique visitors with at least one page view"
    },
    {
      label: "Viewed course or blog",
      count: uniqueVisitors(events, (event) => event.eventName === "course_viewed" || event.eventName === "blog_viewed" || Boolean(event.path?.startsWith("/courses")) || Boolean(event.path?.startsWith("/blog"))),
      hint: "Visitors who reached education content"
    },
    {
      label: "Clicked CTA",
      count: uniqueVisitors(events, (event) => ctaEvents.has(event.eventName) || event.eventName === "course_clicked" || event.eventName === "blog_clicked"),
      hint: "Visitors showing intent through buttons or links"
    },
    {
      label: "Submitted lead",
      count: uniqueVisitors(events, (event) => leadEvents.has(event.eventName)),
      hint: "Visitors who submitted contact/apply forms"
    }
  ];
  const funnelTotal = funnel[0]?.count || 0;
  const posthogProjectId = process.env.POSTHOG_PROJECT_ID || "462506";
  const posthogAppHost = process.env.POSTHOG_APP_HOST || "https://us.posthog.com";
  const posthogConfigured = Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST);
  const posthogReportingConfigured = Boolean(process.env.POSTHOG_PERSONAL_API_KEY);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge>PostHog + Local Mirror</Badge>
          <h1 className="mt-3 font-display text-3xl font-bold">Analytics Dashboard</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Track visitors, segments, funnels and conversion actions for the last 30 days. Events are sent to PostHog and mirrored locally for this admin view.
          </p>
        </div>
        <Button asChild variant="outline">
          <a href={`${posthogAppHost}/project/${posthogProjectId}`} target="_blank" rel="noopener noreferrer">
            <Icon name="ExternalLink" className="h-4 w-4" />
            Open PostHog
          </a>
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Visitors", value: visitors, hint: `${sessions || 0} sessions`, icon: "Users", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
          { label: "Page Views", value: pageViews, hint: `${events.length} total tracked events`, icon: "Eye", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
          { label: "CTA Clicks", value: ctaClicks, hint: "WhatsApp, signup, app links and apply clicks", icon: "MousePointerClick", color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
          { label: "Lead Events", value: leads, hint: `${percent(leads, Math.max(pageViews, 1))} of page views`, icon: "TrendingUp", color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" }
        ].map((stat) => (
          <article key={stat.label} className="surface p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="mt-2 font-display text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`rounded-md p-3 ${stat.color}`}>
                <Icon name={stat.icon} className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-4 text-xs font-semibold text-secondary">{stat.hint}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="surface p-5">
          <h2 className="font-display text-2xl font-bold">Conversion Funnel</h2>
          <div className="mt-6 space-y-5">
            {funnel.map((step, index) => (
              <div key={step.label}>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{index + 1}. {step.label}</p>
                    <p className="text-xs text-slate-500">{step.hint}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-bold">{step.count}</p>
                    <p className="text-xs font-semibold text-primary">{percent(step.count, funnelTotal)}</p>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-900">
                  <div className="h-3 rounded-full bg-primary" style={{ width: percent(step.count, funnelTotal) }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="surface p-5">
          <h2 className="font-display text-2xl font-bold">Segments</h2>
          <p className="mt-2 text-sm text-slate-500">Exam, course filter and blog category interests.</p>
          <div className="mt-5 space-y-3">
            {segmentRows.length ? segmentRows.map(([segment, count]) => (
              <div key={segment} className="flex items-center justify-between rounded-md bg-slate-50 px-4 py-3 dark:bg-slate-900">
                <span className="font-semibold">{segment}</span>
                <Badge>{count}</Badge>
              </div>
            )) : (
              <p className="rounded-md bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-900">No segment events yet. Interact with course filters or submit a form to populate this.</p>
            )}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <AnalyticsList title="Top Pages" rows={topPages} empty="No page views yet." />
        <AnalyticsList title="Top Events" rows={topEventRows} empty="No events yet." />
        <AnalyticsList title="Traffic Sources" rows={sourceRows} empty="No traffic source data yet." />
      </section>

      <section className="surface p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Known Users</h2>
            <p className="mt-2 text-sm text-slate-500">Visitors become known after newsletter, contact, application or login details are submitted.</p>
          </div>
          <Badge>{knownUserRows.length} identified</Badge>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {knownUserRows.length ? knownUserRows.map(([user, count]) => (
            <div key={user} className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
              <p className="truncate font-semibold">{user}</p>
              <p className="mt-2 text-xs text-slate-500">{count} tracked event{count === 1 ? "" : "s"}</p>
            </div>
          )) : (
            <p className="rounded-md bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-900 md:col-span-2 xl:col-span-4">
              No identified users yet. Submit a newsletter, contact or application form to populate this.
            </p>
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <article className="surface overflow-hidden p-0">
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-display text-2xl font-bold">Recent Events</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-900">
                <tr>
                  <th className="px-5 py-3">Event</th>
                  <th className="px-5 py-3">Path</th>
                  <th className="px-5 py-3">Visitor</th>
                  <th className="px-5 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {events.slice(0, 12).map((event) => (
                  <tr key={event.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-5 py-3 font-semibold">{event.eventName}</td>
                    <td className="max-w-[260px] truncate px-5 py-3 text-slate-500">{event.path || textProperty(event, "path") || "-"}</td>
                    <td className="max-w-[220px] truncate px-5 py-3 text-slate-500">{knownUserLabel(event)}</td>
                    <td className="px-5 py-3 text-slate-500">{formatDate(event.createdAt)}</td>
                  </tr>
                ))}
                {!events.length ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-slate-500">No events tracked yet.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="surface p-5">
          <h2 className="font-display text-2xl font-bold">PostHog Setup</h2>
          <div className="mt-5 space-y-3 text-sm">
            <StatusRow label="Event capture" ready={posthogConfigured} />
            <StatusRow label="Project ID" value={posthogProjectId} ready={Boolean(posthogProjectId)} />
            <StatusRow label="Admin API reports" ready={posthogReportingConfigured} />
          </div>
          <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            Add <code className="font-semibold">POSTHOG_PERSONAL_API_KEY</code> in Vercel when you want live PostHog API pulls. This dashboard already works from the free local mirror.
          </div>
          <Button asChild className="mt-5 w-full" variant="outline">
            <Link href="/admin/leads">View Leads</Link>
          </Button>
        </aside>
      </section>
    </div>
  );
}

function AnalyticsList({ title, rows, empty }: { title: string; rows: Array<[string, number]>; empty: string }) {
  const max = rows[0]?.[1] || 0;

  return (
    <article className="surface p-5">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <div className="mt-5 space-y-4">
        {rows.length ? rows.map(([label, count]) => (
          <div key={label}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="truncate font-semibold">{label}</span>
              <span className="text-slate-500">{count}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-900">
              <div className="h-2 rounded-full bg-secondary" style={{ width: percent(count, max) }} />
            </div>
          </div>
        )) : (
          <p className="rounded-md bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-900">{empty}</p>
        )}
      </div>
    </article>
  );
}

function StatusRow({ label, ready, value }: { label: string; ready: boolean; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-slate-50 px-4 py-3 dark:bg-slate-900">
      <span className="font-semibold">{label}</span>
      <span className={ready ? "text-emerald-600" : "text-amber-600"}>
        {value || (ready ? "Ready" : "Missing")}
      </span>
    </div>
  );
}

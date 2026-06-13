import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";
import { NewsletterAdmin, type NewsletterSubscriberRow } from "@/components/admin/NewsletterAdmin";

export const dynamic = "force-dynamic";

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata"
  }).format(date);
}

export default async function NewsletterAdminPage() {
  noStore();

  const [subscribers, activeCount, unsubscribedCount] = await Promise.all([
    prisma.newsletter.findMany({
      orderBy: { createdAt: "desc" },
      take: 250
    }),
    prisma.newsletter.count({ where: { subscribed: true } }),
    prisma.newsletter.count({ where: { subscribed: false } })
  ]);

  const rows: NewsletterSubscriberRow[] = subscribers.map((subscriber) => ({
    id: subscriber.id,
    email: subscriber.email,
    subscribed: subscriber.subscribed,
    createdAt: formatDate(subscriber.createdAt),
    unsubscribedAt: subscriber.unsubscribedAt?.toISOString() ?? null
  }));

  return <NewsletterAdmin subscribers={rows} activeCount={activeCount} unsubscribedCount={unsubscribedCount} />;
}

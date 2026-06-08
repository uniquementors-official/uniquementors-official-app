import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const getStats = unstable_cache(
  async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const week = new Date();
    week.setDate(week.getDate() - 7);

    const [totalLeads, newLeadsToday, newLeadsThisWeek, totalBlogs, publishedBlogs, draftBlogs, totalCourses, totalSubscribers, recentLeads] =
      await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { createdAt: { gte: today } } }),
        prisma.lead.count({ where: { createdAt: { gte: week } } }),
        prisma.blog.count(),
        prisma.blog.count({ where: { status: "PUBLISHED" } }),
        prisma.blog.count({ where: { status: "DRAFT" } }),
        prisma.course.count({ where: { status: "PUBLISHED" } }),
        prisma.newsletter.count({ where: { subscribed: true } }),
        prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 })
      ]);

    const statuses = await prisma.lead.groupBy({
      by: ["status"],
      _count: { status: true }
    });
    const sources = await prisma.lead.groupBy({
      by: ["source"],
      _count: { source: true }
    });

    return {
      totalLeads,
      newLeadsToday,
      newLeadsThisWeek,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalCourses,
      totalSubscribers,
      leadsByStatus: Object.fromEntries(statuses.map((item) => [item.status, item._count.status])),
      leadsBySource: Object.fromEntries(sources.map((item) => [item.source, item._count.source])),
      recentLeads
    };
  },
  ["admin-stats"],
  { revalidate: 60 }
);

export async function GET() {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);
    return ok(await getStats());
  } catch (error) {
    console.error("stats error", error);
    return fail("Unable to fetch stats", 500);
  }
}

import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/common/Icon";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata"
  }).format(date);
}

function statusColor(status: string) {
  if (status === "NEW") return "warning" as const;
  if (status === "ENROLLED") return "success" as const;
  return "outline" as const;
}

export default async function AdminDashboardPage() {
  noStore();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalLeads,
    newToday,
    leadsLastWeek,
    publishedBlogs,
    activeCourses,
    activeSubscribers,
    recentLeads,
    statuses,
    analyticsEvents
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: today } } }),
    prisma.lead.count({ where: { createdAt: { gte: lastWeek } } }),
    prisma.blog.count({ where: { status: "PUBLISHED" } }),
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.newsletter.count({ where: { subscribed: true } }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 8
    }),
    prisma.lead.groupBy({
      by: ["status"],
      _count: { status: true }
    }),
    prisma.analyticsEvent.count({ where: { createdAt: { gte: lastWeek } } })
  ]);

  const statusRows = ["NEW", "CONTACTED", "ENROLLED", "CLOSED"].map((status) => ({
    status,
    count: statuses.find((item) => item.status === status)?._count.status ?? 0
  }));
  const maxStatus = Math.max(...statusRows.map((row) => row.count), 1);

  return (
    <div className="space-y-6">
      <DashboardStats
        stats={[
          { label: "Total Leads", value: totalLeads, change: `${leadsLastWeek} leads in last 7 days`, icon: "Users", color: "blue" },
          { label: "New Today", value: newToday, change: "Live from database", icon: "TrendingUp", color: "green" },
          { label: "Published Blogs", value: publishedBlogs, change: "Public blog posts", icon: "FileText", color: "purple" },
          { label: "Active Subscribers", value: activeSubscribers, change: `${activeCourses} active courses · ${analyticsEvents} analytics events`, icon: "Mail", color: "orange" }
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="surface overflow-hidden p-0">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 p-5 dark:border-slate-800">
            <div>
              <h2 className="font-display text-2xl font-bold">Recent Leads</h2>
              <p className="text-sm text-slate-500">Latest enquiries and applications from the database.</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/leads">View All</Link>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-900">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Exam</th>
                  <th className="px-5 py-3">Source</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-5 py-3">
                      <p className="font-semibold">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.email || lead.phone}</p>
                    </td>
                    <td className="px-5 py-3">{lead.examType ? <Badge>{lead.examType}</Badge> : "-"}</td>
                    <td className="px-5 py-3"><Badge variant="outline">{lead.source}</Badge></td>
                    <td className="px-5 py-3"><Badge variant={statusColor(lead.status)}>{lead.status}</Badge></td>
                    <td className="px-5 py-3 text-slate-500">{formatDate(lead.createdAt)}</td>
                    <td className="px-5 py-3">
                      <Link href="/admin/leads" className="font-semibold text-primary">View</Link>
                    </td>
                  </tr>
                ))}
                {!recentLeads.length ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-slate-500">No leads yet.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="surface p-5">
          <h2 className="font-display text-2xl font-bold">Leads by Status</h2>
          <div className="mt-5 space-y-4">
            {statusRows.map(({ status, count }) => (
              <div key={status}>
                <div className="mb-2 flex justify-between text-sm font-semibold">
                  <span>{status}</span>
                  <span>{count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.round((count / maxStatus) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3">
            <Button asChild>
              <Link href="/admin/blogs/new">
                <Icon name="Plus" className="h-4 w-4" />
                New Blog Post
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/courses/new">New Course</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/newsletter">Newsletter</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/analytics">
                <Icon name="BarChart3" className="h-4 w-4" />
                View Analytics
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

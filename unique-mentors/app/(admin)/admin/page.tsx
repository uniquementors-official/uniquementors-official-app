"use client";

import Link from "next/link";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/common/Icon";

type RecentLead = {
  id: string;
  name: string;
  exam: string;
  source: string;
  status: string;
  date: string;
};

const recentLeads: RecentLead[] = [
  { id: "1", name: "Asha Kumar", exam: "HAAD", source: "Apply", status: "NEW", date: "Jun 8, 2026" },
  { id: "2", name: "Vivek Nair", exam: "DHA", source: "Contact", status: "CONTACTED", date: "Jun 8, 2026" },
  { id: "3", name: "Nimisha Thomas", exam: "MOH", source: "Apply", status: "ENROLLED", date: "Jun 7, 2026" },
  { id: "4", name: "Jacob Mathew", exam: "DHA", source: "Contact", status: "NEW", date: "Jun 7, 2026" },
  { id: "5", name: "Farhan Ali", exam: "HAAD", source: "Apply", status: "CONTACTED", date: "Jun 6, 2026" }
];

const columns: Column<RecentLead>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "exam", header: "Exam", render: (row) => <Badge>{row.exam}</Badge> },
  { key: "source", header: "Source" },
  { key: "status", header: "Status", render: (row) => <Badge variant={row.status === "NEW" ? "warning" : row.status === "ENROLLED" ? "success" : "outline"}>{row.status}</Badge> },
  { key: "date", header: "Date" },
  { key: "action", header: "Action", render: () => <Link href="/admin/leads" className="font-semibold text-primary">View</Link> }
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardStats
        stats={[
          { label: "Total Leads", value: 128, change: "+12% from last week", icon: "Users", color: "blue" },
          { label: "New Today", value: 6, change: "+3 since morning", icon: "TrendingUp", color: "green" },
          { label: "Published Blogs", value: 5, change: "3 featured articles", icon: "FileText", color: "purple" },
          { label: "Active Courses", value: 12, change: "8 exam types covered", icon: "BookOpen", color: "orange" }
        ]}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-bold">Recent Leads</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/leads">View All</Link>
            </Button>
          </div>
          <DataTable columns={columns} data={recentLeads} getRowId={(row) => row.id} />
        </section>
        <aside className="surface p-5">
          <h2 className="font-display text-2xl font-bold">Leads by Status</h2>
          <div className="mt-5 space-y-4">
            {[
              ["NEW", 38, "bg-amber-500"],
              ["CONTACTED", 54, "bg-blue-500"],
              ["ENROLLED", 24, "bg-emerald-500"],
              ["CLOSED", 12, "bg-slate-500"]
            ].map(([status, count, color]) => (
              <div key={status}>
                <div className="mb-2 flex justify-between text-sm font-semibold">
                  <span>{status}</span>
                  <span>{count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className={`h-2 rounded-full ${color}`} style={{ width: `${Number(count) * 1.4}%` }} />
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
              <Link href="/admin/leads">Export Leads CSV</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { LeadSource, LeadStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LeadsTable, type LeadRow } from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

type LeadsPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeZone: "Asia/Kolkata"
});

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function validStatus(value?: string) {
  return value && Object.values(LeadStatus).includes(value as LeadStatus) ? (value as LeadStatus) : undefined;
}

function validSource(value?: string) {
  return value && Object.values(LeadSource).includes(value as LeadSource) ? (value as LeadSource) : undefined;
}

function dateRange(value?: string) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const start = new Date(`${value}T00:00:00+05:30`);
  if (Number.isNaN(start.getTime())) return undefined;
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { gte: start, lt: end };
}

function display(value: string | null | undefined) {
  return value?.trim() || "-";
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  noStore();

  const q = one(searchParams?.q)?.trim() || "";
  const status = validStatus(one(searchParams?.status));
  const source = validSource(one(searchParams?.source));
  const date = one(searchParams?.date) || "";

  const where: Prisma.LeadWhereInput = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
      { profession: { contains: q, mode: "insensitive" } },
      { examType: { contains: q, mode: "insensitive" } },
      { location: { contains: q, mode: "insensitive" } },
      { targetCountry: { contains: q, mode: "insensitive" } }
    ];
  }
  if (status) where.status = status;
  if (source) where.source = source;
  const createdAt = dateRange(date);
  if (createdAt) where.createdAt = createdAt;

  const [leads, total, statusRows, sourceRows] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200
    }),
    prisma.lead.count({ where }),
    prisma.lead.groupBy({
      by: ["status"],
      _count: { _all: true }
    }),
    prisma.lead.groupBy({
      by: ["source"],
      _count: { _all: true }
    })
  ]);

  const rows: LeadRow[] = leads.map((lead) => ({
    id: lead.id,
    name: lead.name,
    email: display(lead.email),
    phone: lead.phone,
    profession: display(lead.profession),
    examType: display(lead.examType),
    source: lead.source,
    status: lead.status,
    date: dateFormatter.format(lead.createdAt)
  }));

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Enquiries & Leads</h2>
          <p className="text-sm text-slate-500">Filter, export and update candidate status from live enquiries.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{total} shown</Badge>
          {statusRows.map((row) => (
            <Badge key={row.status} variant="outline">
              {row.status}: {row._count._all}
            </Badge>
          ))}
        </div>
      </div>

      <form className="surface grid gap-3 p-4 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]" method="get">
        <input
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          name="q"
          placeholder="Search name, email, phone"
          defaultValue={q}
        />
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm" name="status" defaultValue={status || ""}>
          <option value="">All Status</option>
          {Object.values(LeadStatus).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm" name="source" defaultValue={source || ""}>
          <option value="">All Sources</option>
          {Object.values(LeadSource).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <input type="date" name="date" className="h-10 rounded-md border border-input bg-background px-3 text-sm" defaultValue={date} />
        <div className="flex gap-2">
          <Button type="submit">Filter</Button>
          <Button asChild variant="outline">
            <Link href="/admin/leads">Clear</Link>
          </Button>
        </div>
      </form>

      <div className="surface flex flex-wrap gap-3 p-4 text-sm text-slate-500">
        <span className="font-semibold text-foreground">Sources:</span>
        {sourceRows.map((row) => (
          <span key={row.source}>{row.source} {row._count._all}</span>
        ))}
        {!sourceRows.length ? <span>No leads recorded yet.</span> : null}
      </div>

      <LeadsTable leads={rows} />
    </div>
  );
}

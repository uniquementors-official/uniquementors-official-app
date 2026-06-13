import { prisma } from "@/lib/db";
import { ok, fail, parseSearchParams } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { LeadSource, LeadStatus, type Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

function dateRange(value?: string) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const start = new Date(`${value}T00:00:00+05:30`);
  if (Number.isNaN(start.getTime())) return undefined;
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { gte: start, lt: end };
}

export async function GET(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const params = parseSearchParams(request.url);
    const page = Number(params.get("page") || 1);
    const limit = Math.min(Number(params.get("limit") || 20), 100);
    const q = params.get("q")?.trim() || undefined;
    const status = params.get("status") || undefined;
    const source = params.get("source") || undefined;
    const examType = params.get("examType") || undefined;
    const date = params.get("date") || undefined;

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
    if (status && status in LeadStatus) where.status = status as LeadStatus;
    if (source && source in LeadSource) where.source = source as LeadSource;
    if (examType) where.examType = examType;
    const createdAt = dateRange(date);
    if (createdAt) where.createdAt = createdAt;

    const [items, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.lead.count({ where })
    ]);

    return ok({ items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error("leads get error", error);
    return fail("Unable to fetch leads", 500);
  }
}

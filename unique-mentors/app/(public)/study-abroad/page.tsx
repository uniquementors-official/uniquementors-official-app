import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { ArticlePostsGrid, type GridArticlePost } from "@/components/ui/article-posts";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateSEOMetadata({
  title: "Study Abroad Counselling, Applications & Visa Guidance | Unique Mentors",
  description: "Explore study abroad destinations, university application guidance, scholarships, visa preparation and intake updates with Unique Mentors Kochi.",
  path: "/study-abroad",
  keywords: ["study abroad counselling Kochi", "overseas education consultant Kerala", "student visa guidance", "university application support"]
});

type StudyAbroadPageProps = { searchParams?: { country?: string; service?: string; search?: string } };

function toGridPost(post: { id: string; title: string; country: string; coverImage: string | null; slug: string; readTime: number }, index: number): GridArticlePost {
  return { id: post.id, title: post.title, category: post.country, imageUrl: post.coverImage || "/images/metro-pillar-candidate.png", href: `/study-abroad/${post.slug}`, views: [1850, 1210, 840, 650][index] ?? 500, readTime: post.readTime, rating: index === 0 ? 5 : 4 };
}

export default async function StudyAbroadPage({ searchParams }: StudyAbroadPageProps) {
  const country = searchParams?.country ?? "";
  const service = searchParams?.service ?? "";
  const search = searchParams?.search?.trim() ?? "";
  const [countries, services, posts] = await Promise.all([
    prisma.studyAbroad.findMany({ where: { status: "PUBLISHED" }, select: { country: true }, distinct: ["country"] }),
    prisma.studyAbroad.findMany({ where: { status: "PUBLISHED" }, select: { service: true }, distinct: ["service"] }),
    prisma.studyAbroad.findMany({ where: { status: "PUBLISHED", ...(country ? { country } : {}), ...(service ? { service } : {}), ...(search ? { OR: [{ title: { contains: search, mode: "insensitive" } }, { excerpt: { contains: search, mode: "insensitive" } }, { country: { contains: search, mode: "insensitive" } }, { service: { contains: search, mode: "insensitive" } }] } : {}) }, orderBy: [{ featured: "desc" }, { publishedAt: "desc" }] })
  ]);

  return <><PageHeader title="Study Abroad, Made Clear" subtitle="Explore destinations, application routes, scholarships, visa support and intake guidance for your next academic step." breadcrumbs={[{ name: "Home", href: "/" }, { name: "Study Abroad", href: "/study-abroad" }]} /><section className="section-padding bg-white dark:bg-slate-950"><div className="container"><div className="mb-8 space-y-5"><div className="flex flex-wrap gap-2"><Link href="/study-abroad"><Badge variant={!country ? "default" : "outline"}>All destinations</Badge></Link>{countries.map((item) => <Link key={item.country} href={`/study-abroad?country=${encodeURIComponent(item.country)}`}><Badge variant={country === item.country ? "default" : "outline"}>{item.country}</Badge></Link>)}</div><div className="flex flex-wrap gap-2"><Link href={country ? `/study-abroad?country=${encodeURIComponent(country)}` : "/study-abroad"}><Badge variant={!service ? "secondary" : "outline"}>All services</Badge></Link>{services.map((item) => <Link key={item.service} href={`/study-abroad?${new URLSearchParams({ ...(country ? { country } : {}), service: item.service }).toString()}`}><Badge variant={service === item.service ? "secondary" : "outline"}>{item.service}</Badge></Link>)}</div></div><ArticlePostsGrid title={country ? `Study in ${country}` : "Your Study Abroad Guide"} description="Practical support from course selection and university applications through to visas, scholarships and pre-departure planning." backgroundLabel="ABROAD" backgroundPosition="right" posts={posts.map(toGridPost)} className="px-0 py-0" /></div></section></>;
}

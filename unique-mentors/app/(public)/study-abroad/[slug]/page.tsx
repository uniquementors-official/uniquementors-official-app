import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TrackView } from "@/components/analytics/TrackView";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReadingProgress } from "@/components/common/ReadingProgress";
import { SchemaMarkup } from "@/components/common/SchemaMarkup";
import { SocialShare } from "@/components/common/SocialShare";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { SITE_CONFIG } from "@/lib/constants";
import { StudyAbroadPostSchema, generateStudyAbroadMetadata } from "@/lib/seo";
import { formatDate, slugify, stripHtml } from "@/lib/utils";
import type { StudyAbroadPost } from "@/types";

export const dynamic = "force-dynamic";

function mapPost(post: {
  id: string; title: string; slug: string; content: string; excerpt: string; country: string; service: string; intake: string | null; tags: string[]; coverImage: string | null; metaTitle: string | null; metaDesc: string | null; author: string; readTime: number; publishedAt: Date | null; featured: boolean; status: string;
}): StudyAbroadPost {
  return { ...post, intake: post.intake || "", coverImage: post.coverImage || "/images/metro-pillar-candidate.png", imageAlt: post.title, metaTitle: post.metaTitle || "", metaDesc: post.metaDesc || "", publishedAt: post.publishedAt?.toISOString() || new Date().toISOString(), status: post.status.toLowerCase() as "draft" | "published" };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.studyAbroad.findUnique({ where: { slug: params.slug } });
  return post ? generateStudyAbroadMetadata(mapPost(post)) : { title: "Study Abroad | Unique Mentors" };
}

export default async function StudyAbroadDetailPage({ params }: { params: { slug: string } }) {
  const post = await prisma.studyAbroad.findUnique({ where: { slug: params.slug } });
  if (!post || post.status !== "PUBLISHED") notFound();
  const guide = mapPost(post);
  const headings = Array.from(guide.content.matchAll(/<h([23])>(.*?)<\/h\1>/g)).map((match) => ({ text: stripHtml(match[2] ?? ""), id: slugify(stripHtml(match[2] ?? "")) }));
  const html = guide.content.replace(/<h([23])>(.*?)<\/h\1>/g, (_, level: string, text: string) => `<h${level} id="${slugify(stripHtml(text))}">${text}</h${level}>`);

  return <><TrackView eventName="study_abroad_viewed" properties={{ postId: guide.id, slug: guide.slug, country: guide.country, service: guide.service }} /><ReadingProgress /><SchemaMarkup schema={StudyAbroadPostSchema(guide)} /><PageHeader title={guide.title} subtitle={guide.excerpt} breadcrumbs={[{ name: "Home", href: "/" }, { name: "Study Abroad", href: "/study-abroad" }, { name: guide.title, href: `/study-abroad/${guide.slug}` }]} /><section className="section-padding bg-white dark:bg-slate-950"><div className="container grid gap-8 lg:grid-cols-[1fr_320px]"><article><div className="relative aspect-[16/9] overflow-hidden rounded-lg"><Image src={guide.coverImage} alt={guide.imageAlt} fill priority sizes="(min-width: 1024px) 780px, 100vw" className="object-cover" /></div><div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400"><Badge>{guide.country}</Badge><Badge variant="outline">{guide.service}</Badge>{guide.intake ? <Badge variant="secondary">{guide.intake}</Badge> : null}<span>{formatDate(guide.publishedAt)}</span><span>{guide.readTime} min read</span></div><div className="prose-article mt-8" dangerouslySetInnerHTML={{ __html: html }} /><div className="mt-8 flex flex-wrap gap-2">{guide.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div><div className="mt-8"><h2 className="mb-3 font-display text-xl font-bold">Share this guide</h2><SocialShare url={`${SITE_CONFIG.url}/study-abroad/${guide.slug}`} title={guide.title} /></div></article><aside className="space-y-5 lg:sticky lg:top-28 lg:h-max"><div className="surface p-5"><h2 className="font-display text-xl font-bold">Guide overview</h2><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-slate-500">Destination</dt><dd className="font-semibold">{guide.country}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Support</dt><dd className="text-right font-semibold">{guide.service}</dd></div>{guide.intake ? <div className="flex justify-between gap-4"><dt className="text-slate-500">Intake</dt><dd className="font-semibold">{guide.intake}</dd></div> : null}</dl></div><div className="surface p-5"><h2 className="font-display text-xl font-bold">Ready to apply?</h2><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Speak to a Unique Mentors counsellor about your academic profile, destination and next intake.</p><Button asChild className="mt-5 w-full"><Link href="/apply" data-analytics-event="study_abroad_apply_clicked" data-analytics-label={guide.title} data-analytics-location="study_abroad_sidebar"><Icon name="PlaneTakeoff" className="h-4 w-4" />Apply for Study Abroad</Link></Button></div>{headings.length ? <div className="surface p-5"><h2 className="font-display text-xl font-bold">On this page</h2><div className="mt-4 space-y-2">{headings.map((heading) => <a key={heading.id} href={`#${heading.id}`} className="block text-sm text-slate-600 hover:text-primary dark:text-slate-300">{heading.text}</a>)}</div></div> : null}</aside></div></section></>;
}

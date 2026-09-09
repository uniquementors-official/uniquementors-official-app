import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { TrackView } from "@/components/analytics/TrackView";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReadingProgress } from "@/components/common/ReadingProgress";
import { SchemaMarkup } from "@/components/common/SchemaMarkup";
import { SocialShare } from "@/components/common/SocialShare";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { SITE_CONFIG } from "@/lib/constants";
import { ArticlePostSchema, generateArticleMetadata } from "@/lib/seo";
import { formatDate, slugify, stripHtml } from "@/lib/utils";

export const dynamic = "force-dynamic";

function mapDbArticleToArticlePost(dbArticle: {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string | null;
  author: string;
  readTime: number;
  publishedAt: Date | null;
  featured: boolean;
  status: any;
}) {
  return {
    id: dbArticle.id,
    title: dbArticle.title,
    slug: dbArticle.slug,
    excerpt: dbArticle.excerpt,
    content: dbArticle.content,
    category: dbArticle.category,
    tags: dbArticle.tags,
    coverImage: dbArticle.coverImage || "/images/image.png",
    imageAlt: dbArticle.title,
    author: dbArticle.author,
    readTime: dbArticle.readTime,
    publishedAt: dbArticle.publishedAt ? dbArticle.publishedAt.toISOString() : new Date().toISOString(),
    featured: dbArticle.featured,
    status: dbArticle.status.toLowerCase() as any
  };
}



export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.article.findUnique({
    where: { slug: params.slug }
  });
  if (!post) return { title: "Article | Unique Mentors" };
  return generateArticleMetadata(mapDbArticleToArticlePost(post));
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const post = await prisma.article.findUnique({
    where: { slug: params.slug }
  });
  if (!post) notFound();

  const mappedPost = mapDbArticleToArticlePost(post);
  const articleUrl = `${SITE_CONFIG.url}/article/${mappedPost.slug}`;
  const headings = Array.from(mappedPost.content.matchAll(/<h([23])>(.*?)<\/h\1>/g)).map((match) => {
    const text = stripHtml(match[2] ?? "");
    return { text, id: slugify(text) };
  });
  const html = mappedPost.content.replace(/<h([23])>(.*?)<\/h\1>/g, (_, level: string, text: string) => {
    const id = slugify(stripHtml(text));
    return `<h${level} id="${id}">${text}</h${level}>`;
  });

  const dbRelated = await prisma.article.findMany({
    where: {
      category: mappedPost.category,
      status: "PUBLISHED",
      NOT: { id: mappedPost.id }
    },
    take: 3
  });
  const related = dbRelated.map((b) => mapDbArticleToArticlePost(b));

  return (
    <>
      <TrackView
        eventName="article_viewed"
        properties={{
          articleId: mappedPost.id,
          slug: mappedPost.slug,
          title: mappedPost.title,
          category: mappedPost.category,
          readTime: mappedPost.readTime
        }}
      />
      <ReadingProgress />
      <SchemaMarkup schema={ArticlePostSchema(mappedPost)} />
      <PageHeader
        title={mappedPost.title}
        subtitle={mappedPost.excerpt}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Article", href: "/article" },
          { name: mappedPost.title, href: `/articles/${mappedPost.slug}` }
        ]}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-8 lg:grid-cols-[1fr_320px]">
          <article>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image src={mappedPost.coverImage} alt={mappedPost.imageAlt} fill priority sizes="(min-width: 1024px) 780px, 100vw" className="object-cover" />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <Badge>{mappedPost.category}</Badge>
              <span>{formatDate(mappedPost.publishedAt)}</span>
              <span>{mappedPost.readTime} min read</span>
              <span>{mappedPost.author}</span>
            </div>
            <div className="prose-article mt-8" dangerouslySetInnerHTML={{ __html: html }} />
            <div className="mt-8 flex flex-wrap gap-2">
              {mappedPost.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-8">
              <h2 className="mb-3 font-display text-xl font-bold">Share this article</h2>
              <SocialShare url={articleUrl} title={mappedPost.title} />
            </div>
          </article>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:h-max">
            <div className="surface p-5">
              <h2 className="font-display text-xl font-bold">Table of Contents</h2>
              <div className="mt-4 space-y-2">
                {headings.map((heading) => (
                  <a key={heading.id} href={`#${heading.id}`} className="block text-sm text-slate-600 hover:text-primary dark:text-slate-300">
                    {heading.text}
                  </a>
                ))}
              </div>
            </div>
            <div className="surface p-5">
              <h2 className="font-display text-xl font-bold">About Unique Mentors</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Kochi-based mentoring for MOH, DHA, HAAD, CORU, Dataflow and global healthcare career readiness.
              </p>
              <Button asChild className="mt-5 w-full">
                <Link
                  href="/apply"
                  data-analytics-event="cta_clicked"
                  data-analytics-label="Article Apply Now"
                  data-analytics-location="article_sidebar"
                >
                  Apply Now
                </Link>
              </Button>
            </div>
            <div className="surface p-5">
              <h2 className="font-display text-xl font-bold">Newsletter</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Get exam tips and licensing updates in your inbox.</p>
              <Button asChild variant="outline" className="mt-5 w-full">
                <Link
                  href="/#newsletter"
                  data-analytics-event="cta_clicked"
                  data-analytics-label="Article newsletter subscribe"
                  data-analytics-location="article_sidebar"
                >
                  <Icon name="Mail" className="h-4 w-4" />
                  Subscribe
                </Link>
              </Button>
            </div>
            {related.length ? (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Related Posts</h2>
                {related.map((item) => (
                  <ArticleCard key={item.slug} post={item} />
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
}

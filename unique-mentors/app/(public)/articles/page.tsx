import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { ArticlePostsGrid, type GridArticlePost } from "@/components/ui/article-posts";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateSEOMetadata({
  title: "Medical Licensing Exam Article - Tips, News & Career Guides",
  description: "Read MOH, DHA, HAAD, CORU and overseas medical licensing exam tips, eligibility guides and career insights from Unique Mentors.",
  path: "/article"
});

type ArticlePageProps = {
  searchParams?: {
    category?: string;
    search?: string;
  };
};

function toGridPost(post: { id: string; title: string; category: string; coverImage: string | null; slug: string; readTime: number }, index: number): GridArticlePost {
  return {
    id: post.id,
    title: post.title,
    category: post.category,
    imageUrl: post.coverImage || "/images/image.png",
    href: `/article/${post.slug}`,
    views: [2180, 1456, 987, 824, 760][index] ?? 640,
    readTime: post.readTime,
    rating: index === 0 ? 5 : 4
  };
}

export default async function ArticlePage({ searchParams }: ArticlePageProps) {
  const category = searchParams?.category ?? "";
  const search = searchParams?.search?.toLowerCase() ?? "";

  // 1. Fetch all distinct categories for published posts (for filters)
  const distinctCategories = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: { category: true },
    distinct: ["category"]
  });
  const categories = distinctCategories.map((c) => c.category);

  // 2. Fetch the filtered posts
  const posts = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      ...(category ? { category } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { excerpt: { contains: search, mode: "insensitive" } },
              { tags: { has: search } }
            ]
          }
        : {})
    },
    orderBy: {
      publishedAt: "desc"
    }
  });

  return (
    <>
      <PageHeader
        title="Medical Licensing Exam Article - Tips, News & Career Guides"
        subtitle="Eligibility updates, application explainers, exam preparation tips and event updates for healthcare professionals."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Article", href: "/article" }
        ]}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <div className="mb-8 flex flex-wrap gap-2">
            <Link href="/article">
              <Badge variant={!category ? "default" : "outline"}>All</Badge>
            </Link>
            {categories.map((item) => (
              <Link key={item} href={`/article?category=${encodeURIComponent(item)}`}>
                <Badge variant={category === item ? "default" : "outline"}>{item}</Badge>
              </Link>
            ))}
          </div>
          <ArticlePostsGrid
            title={category ? `${category} Articles` : "Our Most Popular Articles"}
            description="Eligibility explainers, exam preparation notes and career guidance from the Unique Mentors team."
            backgroundLabel="BLOG"
            backgroundPosition="right"
            posts={posts.map(toGridPost)}
            className="px-0 py-0"
          />
        </div>
      </section>
    </>
  );
}

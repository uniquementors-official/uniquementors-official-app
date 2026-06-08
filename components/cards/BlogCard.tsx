import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/common/Icon";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

type BlogCardProps = {
  post: BlogPost;
  large?: boolean;
};

const categoryVariants: Record<string, "default" | "secondary" | "warning" | "success" | "muted"> = {
  MOH: "default",
  DHA: "secondary",
  HAAD: "success",
  Events: "warning"
};

export function BlogCard({ post, large = false }: BlogCardProps) {
  return (
    <article className="group surface flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-video overflow-hidden" aria-label={`Read ${post.title}`}>
        <Image
          src={post.coverImage}
          alt={post.imageAlt}
          fill
          sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/65 via-transparent to-transparent" />
        <Badge variant={categoryVariants[post.category] ?? "muted"} className="absolute left-3 top-3 shadow-sm">
          {post.category}
        </Badge>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-ink">
          <Icon name="Clock" className="h-3.5 w-3.5" />
          {post.readTime} min read
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.author}</span>
        </div>
        <h3 className={large ? "font-display text-2xl font-bold leading-snug" : "font-display text-xl font-bold leading-snug"}>
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary">
          Read Article
          <Icon name="ArrowRight" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

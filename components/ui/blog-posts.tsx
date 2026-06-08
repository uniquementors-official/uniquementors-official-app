"use client";

import Link from "next/link";
import { MoveRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type GridBlogPost = {
  id: number | string;
  title: string;
  category: string;
  imageUrl: string;
  href: string;
  views: number;
  readTime?: number;
  rating?: number;
  className?: string;
};

type GridSectionProps = {
  title: string;
  description: string;
  backgroundLabel?: string;
  backgroundPosition?: "left" | "right";
  posts?: GridBlogPost[];
  className?: string;
  onPostClick?: (post: GridBlogPost) => void;
};

export function BlogPostsGrid({
  title,
  description,
  backgroundLabel,
  backgroundPosition = "left",
  posts = [],
  className,
  onPostClick
}: GridSectionProps) {
  return (
    <section className={cn("container relative mx-auto overflow-hidden px-4 py-16", className)}>
      <h2 className="text-center font-display text-4xl font-semibold capitalize leading-tight tracking-normal md:text-5xl lg:text-6xl">
        {title}
      </h2>

      {backgroundLabel ? (
        <span
          className={cn(
            "pointer-events-none absolute -top-8 select-none font-display text-[150px] font-extrabold leading-none tracking-normal text-slate-950/[0.035] dark:text-white/[0.045] md:text-[250px] lg:text-[360px]",
            backgroundPosition === "left" ? "-left-[12%]" : "-right-[18%]"
          )}
          aria-hidden="true"
        >
          {backgroundLabel}
        </span>
      ) : null}

      <p className="mx-auto mb-8 mt-4 max-w-[800px] text-center text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl">
        {description}
      </p>

      <div className="grid h-auto grid-cols-1 gap-5 md:h-[650px] md:grid-cols-2 lg:grid-cols-[1fr_0.5fr]">
        {posts.map((post, index) => {
          const isPrimary = index === 0;
          const rating = post.rating ?? 4;
          const content = (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

              <article className="relative z-10 flex items-end gap-4">
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <h3 className="text-2xl font-semibold leading-tight tracking-normal md:text-3xl lg:text-4xl">
                    {post.title}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <span className="w-fit rounded-md bg-white/25 px-2 py-1 text-sm font-semibold capitalize text-white backdrop-blur-md">
                      {post.category}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="h-4 w-4 md:h-5 md:w-5"
                            stroke={idx < rating ? "#ffa534" : "#ffffff66"}
                            fill={idx < rating ? "#ffa534" : "#ffffff44"}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-white/80 md:text-base">({post.views} Views)</span>
                    </div>
                    {post.readTime ? <div className="text-base font-semibold md:text-lg">{post.readTime} min read</div> : null}
                  </div>
                </div>
                <MoveRight
                  className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:translate-x-2 md:h-10 md:w-10"
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </article>
            </>
          );

          return (
            <Link
              key={post.id}
              href={post.href}
              style={{
                backgroundImage: `linear-gradient(to top, rgba(2, 6, 23, 0.2), rgba(2, 6, 23, 0)), url(${post.imageUrl})`
              }}
              className={cn(
                "group relative flex min-h-[300px] cursor-pointer flex-col justify-end overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.14)] transition-all duration-300 hover:scale-[0.985] hover:rotate-[0.25deg] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isPrimary && "md:col-span-2 md:row-span-2 lg:col-span-1",
                post.className
              )}
              onClick={() => onPostClick?.(post)}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export const Component = BlogPostsGrid;

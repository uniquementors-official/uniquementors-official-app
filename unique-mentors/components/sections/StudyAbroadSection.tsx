import { BlogPostsGrid, type GridBlogPost } from "@/components/ui/blog-posts";
import type { StudyAbroadPost } from "@/types";

type StudyAbroadSectionProps = { posts: StudyAbroadPost[] };

function toGridPost(post: StudyAbroadPost, index: number): GridBlogPost {
  return {
    id: post.id,
    title: post.title,
    category: post.country,
    imageUrl: post.coverImage,
    href: `/study-abroad/${post.slug}`,
    views: [1850, 1210, 840][index] ?? 600,
    readTime: post.readTime,
    rating: index === 0 ? 5 : 4
  };
}

export function StudyAbroadSection({ posts }: StudyAbroadSectionProps) {
  if (!posts.length) return null;
  return (
    <section className="bg-white dark:bg-slate-950">
      <BlogPostsGrid
        title="Plan Your Study Abroad Journey"
        description="Destination guides, university application guidance, visa support and scholarship advice from the Unique Mentors team."
        backgroundLabel="GLOBAL"
        backgroundPosition="right"
        posts={posts.map(toGridPost)}
        className="py-20"
      />
    </section>
  );
}

import { BlogPostsGrid, type GridBlogPost } from "@/components/ui/blog-posts";
import type { BlogPost } from "@/types";

type BlogSectionProps = {
  posts: BlogPost[];
};

function toGridPost(post: BlogPost, index: number): GridBlogPost {
  return {
    id: post.id,
    title: post.title,
    category: post.category,
    imageUrl: post.coverImage,
    href: `/blog/${post.slug}`,
    views: [2180, 1456, 987][index] ?? 820,
    readTime: post.readTime,
    rating: index === 0 ? 5 : 4
  };
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="bg-slate-50 dark:bg-slate-900">
      <BlogPostsGrid
        title="Latest News From Unique Mentors"
        description="Exam tips, eligibility updates and career guidance for overseas healthcare licensing."
        backgroundLabel="BLOG"
        backgroundPosition="left"
        posts={posts.map(toGridPost)}
        className="py-20"
      />
    </section>
  );
}

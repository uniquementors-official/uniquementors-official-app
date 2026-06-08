import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE_CONFIG } from "@/lib/constants";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/services/overseas-licensing-exam", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/services/finishing-school", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/services/gcc-western-license-processing", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/courses", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/courses/moh-exam-training", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/courses/dha-exam-training", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/courses/haad-exam-training", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/courses/coru-registration", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/events", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/apply", priority: 0.85, changeFrequency: "monthly" as const }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const routes = staticRoutes.map((route) => ({
    url: `${SITE_CONFIG.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  const dbCourses = await prisma.course.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true }
  });
  const courseRoutes = dbCourses.map((course) => ({
    url: `${SITE_CONFIG.url}/courses/${course.slug}`,
    lastModified: course.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.82
  }));

  const dbBlogs = await prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, publishedAt: true }
  });
  const blogRoutes = dbBlogs.map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: post.publishedAt || now,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  const dbEvents = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true }
  });
  const eventRoutes = dbEvents.map((event) => ({
    url: `${SITE_CONFIG.url}/events/${event.slug}`,
    lastModified: event.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.75
  }));

  return [...routes, ...courseRoutes, ...blogRoutes, ...eventRoutes];
}

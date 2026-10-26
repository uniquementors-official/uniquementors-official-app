import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { AboutSection } from "@/components/sections/AboutSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { StudyAbroadSection } from "@/components/sections/StudyAbroadSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { CTASection } from "@/components/sections/CTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { ScrollableVideoSection } from "@/components/sections/ScrollableVideoSection";
import { GlobeSection } from "@/components/sections/GlobeSection";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Course, BlogPost, StudyAbroadPost } from "@/types";
import { unstable_cache } from "next/cache";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateSEOMetadata({
  title: "Unique Mentors - Overseas Medical Licensing Exam Training Centre | MOH | DHA | HAAD | OMSB | QCHP | SCFHS | Kochi",
  description:
    "Prepare for MOH, DHA, HAAD, OMSB, QCHP, SCFHS, USMLE, PLAB and AMC exams with Unique Mentors' expert training in Kochi, Kerala. 5000+ successful candidates trained across 11+ countries. GCC DataFlow, medical license processing, career services and interview preparation. Enroll today!",
  path: "/",
  keywords: [
    "overseas medical licensing exam training centre",
    "prometric coaching centre Kochi", "prometric exam for physiotherapist",
    "prometric exam for lab technician", "dha coaching centre in Kerala",
    "moh exam for physiotherapist", "haad exam for lab technician",
    "GCC medical license processing", "finishing school Kochi Kerala"
  ]
});

function mapDbCourseToCourse(dbCourse: any): Course {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
    slug: dbCourse.slug,
    examType: dbCourse.examType as any,
    examTypes: dbCourse.examTypes as any[],
    profession: dbCourse.profession,
    country: dbCourse.country,
    duration: dbCourse.duration,
    mode: dbCourse.mode as any,
    fees: dbCourse.fees || "",
    nextBatch: dbCourse.nextBatch || "",
    excerpt: dbCourse.shortDescription,
    description: dbCourse.description,
    eligibility: dbCourse.eligibility,
    highlights: dbCourse.highlights,
    syllabus: dbCourse.syllabus ? dbCourse.syllabus.split("\n") : [],
    faqs: (dbCourse.faqs as any) || [],
    featured: dbCourse.featured,
    status: dbCourse.status.toLowerCase() as any,
    coverImage: dbCourse.coverImage || "/images/metro-pillar-candidate.png",
    imageAlt: dbCourse.title
  };
}

function toIsoDate(value: unknown) {
  if (!value) return new Date().toISOString();
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function mapDbBlogToBlogPost(dbBlog: any): BlogPost {
  return {
    id: dbBlog.id,
    title: dbBlog.title,
    slug: dbBlog.slug,
    excerpt: dbBlog.excerpt,
    content: dbBlog.content,
    category: dbBlog.category,
    tags: dbBlog.tags,
    coverImage: dbBlog.coverImage || "/images/image.png",
    imageAlt: dbBlog.title,
    author: dbBlog.author,
    readTime: dbBlog.readTime,
    publishedAt: toIsoDate(dbBlog.publishedAt),
    featured: dbBlog.featured,
    status: dbBlog.status.toLowerCase() as any
  };
}

function mapDbStudyAbroadPost(dbPost: any): StudyAbroadPost {
  return {
    id: dbPost.id, title: dbPost.title, slug: dbPost.slug, excerpt: dbPost.excerpt, content: dbPost.content,
    country: dbPost.country, service: dbPost.service, intake: dbPost.intake || "", tags: dbPost.tags,
    coverImage: dbPost.coverImage || "/images/metro-pillar-candidate.png", imageAlt: dbPost.title, metaTitle: dbPost.metaTitle || "", metaDesc: dbPost.metaDesc || "",
    author: dbPost.author, readTime: dbPost.readTime, publishedAt: toIsoDate(dbPost.publishedAt),
    featured: dbPost.featured, status: dbPost.status.toLowerCase() as "draft" | "published"
  };
}

const getHomeContent = unstable_cache(
  async () => {
    // The hosted Supabase transaction pool has a deliberately low connection
    // limit. Run this cold-cache work in sequence; subsequent visits use cache.
    const courses = await prisma.course.findMany({ where: { status: "PUBLISHED" } });
    const blogs = await prisma.blog.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" }, take: 3 });
    const studyAbroadPosts = await prisma.studyAbroad.findMany({ where: { status: "PUBLISHED" }, orderBy: [{ featured: "desc" }, { publishedAt: "desc" }], take: 3 });
    const events = await prisma.event.findMany({ where: { status: "PUBLISHED" }, orderBy: { eventDate: "desc" }, take: 3 });
    return [courses, blogs, studyAbroadPosts, events] as const;
  },
  ["home-content"],
  { revalidate: 300 }
);

export const revalidate = 300;

export default async function HomePage() {
  const [dbCourses, dbBlogs, dbStudyAbroadPosts, dbEvents] = await getHomeContent();
  const courses = dbCourses.map(mapDbCourseToCourse);
  const blogs = dbBlogs.map(mapDbBlogToBlogPost);
  const studyAbroadPosts = dbStudyAbroadPosts.map(mapDbStudyAbroadPost);
  const events = dbEvents.map((e) => ({
    id: e.id,
    title: e.title,
    slug: e.slug,
    excerpt: e.excerpt,
    eventDate: toIsoDate(e.eventDate),
    location: e.location,
    coverImage: e.coverImage || undefined
  }));

  return (
    <>
      <HeroSection />
      <section className="bg-white py-10 dark:bg-slate-950" aria-label="Unique Mentors introduction">
        <div className="container">
          <p className="mx-auto max-w-4xl text-center text-base leading-8 text-slate-600 dark:text-slate-300">
            Unique Mentors is an overseas medical licensing exam training centre in Kochi, Kerala, supporting Indian
            healthcare professionals who want to build international careers across the GCC and Western countries. Our
            academic and counselling teams guide candidates through MOH exam training, DHA exam coaching, HAAD exam
            preparation, CORU registration support, GCC Dataflow documentation and medical license processing. Every
            student receives practical mentoring based on profession, qualification, experience, target country and exam
            timeline. Whether you are a lab technician, pharmacist, radiographer, microbiologist, general practitioner,
            dentist, nurse, physiotherapist or Ayush physician, Unique Mentors helps you understand eligibility, prepare
            with structured study plans, practice with mock tests and approach licensing applications with confidence.
            The finishing school program strengthens communication, leadership, cultural awareness, interview readiness
            and workplace professionalism so candidates are prepared not only to pass an exam but also to thrive in a
            global healthcare environment.
          </p>
        </div>
      </section>
      <StatsSection />
      <ServicesSection />
      <CoursesSection initialCourses={courses} />
      <StudyAbroadSection posts={studyAbroadPosts} />
      <ScrollableVideoSection />
      <VideoSection />
      {/* <GlobeSection /> */}
      <AboutSection />
      <EventsSection events={events} />
      <TestimonialsSection />
      <BlogSection posts={blogs} />
      {/* <NewsletterSection /> */}
      <CTASection />
      <ContactSection />
    </>
  );
}

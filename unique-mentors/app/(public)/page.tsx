import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { AboutSection } from "@/components/sections/AboutSection";
import { BlogSection } from "@/components/sections/BlogSection";
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
import type { Course, BlogPost } from "@/types";

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
    publishedAt: dbBlog.publishedAt ? dbBlog.publishedAt.toISOString() : new Date().toISOString(),
    featured: dbBlog.featured,
    status: dbBlog.status.toLowerCase() as any
  };
}

export default async function HomePage() {
  // 1. Fetch published courses
  const dbCourses = await prisma.course.findMany({
    where: { status: "PUBLISHED" }
  });
  const courses = dbCourses.map(mapDbCourseToCourse);

  // 2. Fetch latest 3 published blogs
  const dbBlogs = await prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 3
  });
  const blogs = dbBlogs.map(mapDbBlogToBlogPost);

  // 3. Fetch latest 3 published events
  const dbEvents = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { eventDate: "desc" },
    take: 3
  });
  const events = dbEvents.map((e) => ({
    id: e.id,
    title: e.title,
    slug: e.slug,
    excerpt: e.excerpt,
    eventDate: e.eventDate.toISOString(),
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

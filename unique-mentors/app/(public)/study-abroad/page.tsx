import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { ArticlePostsGrid, type GridArticlePost } from "@/components/ui/article-posts";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateSEOMetadata({
  title: "Study Abroad Counselling, Applications & Visa Guidance | Unique Mentors",
  description: "Explore study abroad destinations, university application guidance, scholarships, visa preparation and intake updates with Unique Mentors Kochi.",
  path: "/study-abroad",
  keywords: ["study abroad counselling Kochi", "overseas education consultant Kerala", "student visa guidance", "university application support"]
});

type StudyAbroadPageProps = { searchParams?: { country?: string } };

const destinationCopy: Record<string, string> = {
  Australia: "Explore universities, courses, admission requirements, and student visa considerations.",
  "United Kingdom": "Discover undergraduate, postgraduate, and other eligible study pathways.",
  Canada: "Explore academic programmes and understand admission requirements.",
  Ireland: "Learn about study opportunities across a range of academic disciplines.",
  Germany: "Explore university options, programme requirements, and language considerations.",
  UAE: "Discover higher education opportunities closer to home.",
  "United Arab Emirates": "Discover higher education opportunities closer to home."
};

const supportStages = [
  { number: "01", title: "Start with your profile", description: "We discuss your academic background, interests, budget, and plans for the future before recommending a direction.", details: ["Profile assessment", "Course and university shortlisting"], icon: "ClipboardList" },
  { number: "02", title: "Build a stronger application", description: "Once you have a direction, we help you organise the application process and understand the financial side of studying overseas.", details: ["Applications and academic documents", "Scholarship and financial guidance"], icon: "FileCheck" },
  { number: "03", title: "Prepare for the move", description: "As your plan takes shape, we explain visa documentation and practical considerations for beginning life in a new country.", details: ["Student visa guidance", "Pre-departure planning"], icon: "PlaneTakeoff" }
] as const;

const faqs = [
  { question: "Can I study abroad after completing my degree?", answer: "Yes, depending on your qualifications, the course you choose, and the admission criteria of the institution." },
  { question: "Can you help me choose a country and university?", answer: "Our counselling process helps you explore options based on your academic background, career goals, preferences, and budget." },
  { question: "Do I need IELTS or another English-language test?", answer: "Requirements vary by institution, programme, and destination. Some institutions may accept alternative evidence of English proficiency." },
  { question: "Can I apply if I have an academic gap?", answer: "An academic gap does not automatically rule out admission. The institution requirements and your individual circumstances need to be assessed." },
  { question: "Can you guarantee admission, a scholarship, or a visa?", answer: "No. Admissions, scholarships, and visa decisions are made by the relevant institutions and authorities. Our role is to provide guidance and application support." }
];

function toGridPost(post: { id: string; title: string; country: string; coverImage: string | null; slug: string; readTime: number }, index: number): GridArticlePost {
  return { id: post.id, title: post.title, category: post.country, imageUrl: post.coverImage || "/images/metro-pillar-candidate.png", href: `/study-abroad/${post.slug}`, views: [1850, 1210, 840, 650][index] ?? 500, readTime: post.readTime, rating: index === 0 ? 5 : 4 };
}

export default async function StudyAbroadPage({ searchParams }: StudyAbroadPageProps) {
  const country = searchParams?.country ?? "";
  const posts = await prisma.studyAbroad.findMany({
    where: { status: "PUBLISHED", ...(country ? { country } : {}) },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }]
  });
  const destinationPosts = Array.from(new Map(posts.map((post) => [post.country, post])).values());

  return <>
    <PageHeader
      title="Study Abroad with Unique Mentors"
      subtitle="Your Global Education Journey Starts Here"
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Study Abroad", href: "/study-abroad" }]}
      primaryCta={{ label: "Book Free Counselling", href: "/apply?service=study-abroad" }}
      secondaryCta={{ label: "Explore Study Destinations", href: "#destinations" }}
    >
      <p className="mt-5 text-base leading-7 text-slate-200">Planning to study abroad? Let Unique Mentors help you explore the right courses, universities, and destinations based on your academic background, career goals, and budget. From selecting a destination to preparing your application and understanding visa requirements, our team helps you move ahead with clarity and confidence.</p>
      <p className="mt-4 font-display text-xl font-semibold text-white">Your goals. Your opportunities. Your future.</p>
    </PageHeader>

    <section id="destinations" className="section-padding bg-white dark:bg-slate-950">
      <div className="container">
        <div className="max-w-3xl">
          <span className="section-tag">Study Destinations</span>
          <h2 className="heading-lg mt-4">Find the right study destination for you</h2>
          <p className="body-lead mt-4">Every student journey is different. Explore international education opportunities and find a destination that aligns with your aspirations, qualifications, and financial plans.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {destinationPosts.map((post) => <Link key={post.id} href={`/study-abroad/${post.slug}`} className="group border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-slate-800">
            <div className="flex items-start justify-between gap-4"><div><Badge variant="secondary">{post.country}</Badge><h3 className="mt-4 font-display text-xl font-bold group-hover:text-primary">Study in {post.country}</h3><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{destinationCopy[post.country] || post.excerpt}</p></div><Icon name="ArrowRight" className="h-5 w-5 shrink-0 text-primary" /></div>
          </Link>)}
        </div>
        <p className="mt-6 text-sm leading-6 text-slate-500">Destination availability, admission criteria, costs, and visa requirements vary by course, institution, and applicant profile.</p>
        <Button asChild variant="outline" className="mt-6"><Link href="#explore-study-destinations">Explore All Destinations <Icon name="ArrowRight" className="h-4 w-4" /></Link></Button>
      </div>
    </section>

    <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div className="container">
        <div className="grid gap-8 border-b border-slate-200 pb-8 dark:border-slate-800 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div><span className="section-tag">Your Counselling Journey</span><h2 className="heading-lg mt-4">A clearer way to plan your next step</h2></div>
          <p className="body-lead">Good decisions start with the right questions. Our counselling is shaped around your profile, not a one-size-fits-all destination list.</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {supportStages.map((stage) => <article key={stage.number} className="flex min-h-[300px] flex-col border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between"><span className="font-display text-4xl font-bold text-primary/25">{stage.number}</span><Icon name={stage.icon} className="h-6 w-6 text-primary" /></div>
            <h3 className="mt-10 font-display text-2xl font-bold">{stage.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{stage.description}</p>
            <ul className="mt-auto space-y-2 pt-6 text-sm font-medium text-slate-700 dark:text-slate-200">{stage.details.map((detail) => <li key={detail} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{detail}</li>)}</ul>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div><span className="section-tag">Make An Informed Choice</span><h2 className="heading-lg mt-4">Why begin with a counselling session?</h2></div>
        <div className="border-l-2 border-primary pl-6"><p className="body-lead">Choosing a study destination involves more than selecting a country. Your qualifications, course preferences, financial plan, and long-term goals all matter.</p><p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">At Unique Mentors, we help you understand your options, identify suitable pathways, and make informed decisions before beginning your application journey.</p><Button asChild className="mt-7"><Link href="/apply?service=study-abroad">Book Free Counselling <Icon name="ArrowRight" className="h-4 w-4" /></Link></Button></div>
      </div>
    </section>

    <section className="section-padding bg-slate-50 dark:bg-slate-900/50"><div className="container max-w-4xl"><div className="text-center"><span className="section-tag">Answers Before You Apply</span><h2 className="heading-lg mt-4">Frequently asked questions</h2></div><div className="mt-10"><FAQAccordion faqs={faqs} /></div></div></section>

    <section id="explore-study-destinations" className="section-padding bg-white dark:bg-slate-950"><div className="container"><ArticlePostsGrid title={country ? `Study in ${country}` : "Explore study destinations"} description="Destination-specific guides, application planning, and practical readiness advice from Unique Mentors." backgroundLabel="ABROAD" backgroundPosition="right" posts={posts.map(toGridPost)} className="px-0 py-0" /></div></section>

    <section className="bg-brand-navy py-16 text-white"><div className="container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div className="max-w-2xl"><h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to explore your Study Abroad options?</h2><p className="mt-4 leading-7 text-slate-200">Tell us about your qualification, preferred destination, and study plans. Our team can help you understand the next steps.</p></div><div className="flex flex-wrap gap-3"><Button asChild variant="secondary" size="lg"><Link href="/apply?service=study-abroad">Enquire Now</Link></Button><Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand-navy"><Link href="/contact">Contact Unique Mentors</Link></Button></div></div></section>
  </>;
}

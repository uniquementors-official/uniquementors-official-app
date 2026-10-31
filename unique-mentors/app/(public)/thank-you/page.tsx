import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/ui/button";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Thank You – Unique Mentors",
  description: "Thank you for reaching out to Unique Mentors. Our counselling team will contact you shortly.",
  path: "/thank-you",
  keywords: ["thank you", "unique mentors", "enquiry received"]
});

export default function ThankYouPage({
  searchParams
}: {
  searchParams: { type?: string; ref?: string };
}) {
  const type = searchParams.type ?? "enquiry";
  const ref = searchParams.ref;

  const config: Record<string, { heading: string; body: string; icon: string }> = {
    contact: {
      heading: "Enquiry Received!",
      body: "Thank you for contacting Unique Mentors. Our counselling team will get back to you very shortly.",
      icon: "Mail"
    },
    apply: {
      heading: "Application Submitted!",
      body: "Thank you for applying. Our counselling team will review your application and call you with the next steps.",
      icon: "FileCheck"
    },
    newsletter: {
      heading: "You're Subscribed!",
      body: "Welcome aboard! You'll now receive the latest updates and resources from Unique Mentors.",
      icon: "Bell"
    },
    enquiry: {
      heading: "Thank You!",
      body: "We have received your request. Our team will contact you shortly.",
      icon: "CheckCircle"
    }
  };

  const { heading, body, icon } = config[type] ?? config.enquiry;

  return (
    <section className="section-padding flex min-h-[70vh] items-center bg-white dark:bg-slate-950">
      <div className="container max-w-2xl text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <Icon name={icon as any} className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          {heading}
        </h1>

        {/* Body */}
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{body}</p>

        {/* Reference number (if provided) */}
        {ref ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-5 py-3 dark:bg-slate-800">
            <Icon name="Hash" className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Reference: <span className="text-primary">{ref}</span>
            </span>
          </div>
        ) : null}

        {/* What happens next */}
        <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6 text-left dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 font-semibold text-slate-800 dark:text-slate-200">What happens next?</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-3">
              <Icon name="Phone" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Our counsellor will call you within <strong className="text-slate-700 dark:text-slate-300">&nbsp;24 hours</strong>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="ClipboardList" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              We will assess your eligibility for the exam or licensing pathway that suits you best
            </li>
            <li className="flex items-start gap-3">
              <Icon name="GraduationCap" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              You will receive a personalised study plan and fee details
            </li>
          </ul>
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Icon name="Home" className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/courses">
              <Icon name="BookOpen" className="h-4 w-4" />
              Explore Courses
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

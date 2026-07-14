import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Terms of Service - Unique Mentors",
  description: "Read the Unique Mentors terms of service for website and service usage.",
  path: "/terms"
});

const sections = [
  {
    title: "Interpretation and Definitions",
    body: "Words with capitalized initial letters have meanings defined under these conditions. The definitions have the same meaning regardless of whether they appear in singular or plural."
  },
  {
    title: "Acknowledgment",
    body: "These Terms and Conditions govern the use of this Service and form the agreement between you and Unique Mentors. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Service."
  },
  {
    title: "Links to Other Websites",
    body: "Our Service may contain links to third-party websites or services that are not owned or controlled by Unique Mentors. We are not responsible for the content, privacy policies or practices of third-party websites or services."
  },
  {
    title: "Termination",
    body: "We may terminate or suspend your access immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will cease immediately."
  },
  {
    title: "Limitation of Liability",
    body: "To the maximum extent permitted by applicable law, Unique Mentors and its suppliers shall not be liable for special, incidental, indirect or consequential damages related to the use of or inability to use the Service."
  },
  {
    title: "AS IS and AS AVAILABLE Disclaimer",
    body: "The Service is provided to you AS IS and AS AVAILABLE, with all faults and defects, without warranty of any kind. Unique Mentors does not warrant that the Service will be uninterrupted, error-free or free of harmful components."
  },
  {
    title: "Governing Law",
    body: "The laws of Kerala, India, excluding conflict of law rules, shall govern these Terms and your use of the Service."
  },
  {
    title: "Disputes Resolution",
    body: "If you have any concern or dispute about the Service, you agree to first try to resolve the dispute informally by contacting Unique Mentors."
  },
  {
    title: "Changes to These Terms and Conditions",
    body: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after revisions become effective, you agree to be bound by the revised terms."
  }
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        subtitle="Last updated: December 30, 2024"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Terms", href: "/terms" }
        ]}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <article className="mx-auto max-w-4xl space-y-8 text-base leading-8 text-slate-700 dark:text-slate-300">
            <p>Please read these terms and conditions carefully before using our Service.</p>
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="font-display text-2xl font-bold text-brand-ink dark:text-white">{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <section className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-display text-2xl font-bold text-brand-ink dark:text-white">Contact Us</h2>
              <p className="mt-3">If you have any questions about these Terms and Conditions, you can contact us by visiting our contact page: https://uniquementors.com/contact/</p>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}

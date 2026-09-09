import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { generateMetadata as generateSEOMetadata, FAQSchema, BreadcrumbSchema } from "@/lib/seo";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import type { FaqItem } from "@/types";

export const metadata: Metadata = generateSEOMetadata({
  title: "Frequently Asked Questions | Unique Mentors",
  description: "Find answers to frequently asked questions about overseas medical licensing exams, DHA, MOH, HAAD, Dataflow, and our coaching services.",
  path: "/faq"
});

const GENERAL_FAQS: FaqItem[] = [
  {
    question: "What is Unique Mentors?",
    answer: "Unique Mentors is a premier overseas medical licensing exam training centre. We provide comprehensive coaching, exam registration, and DataFlow services for healthcare professionals looking to work in GCC countries and Western nations."
  },
  {
    question: "Which licensing exams do you provide coaching for?",
    answer: "We offer dedicated training for DHA (Dubai), MOH (UAE), HAAD/DOH (Abu Dhabi), Prometric (Saudi, Qatar, Oman), NHRA (Bahrain), as well as Western exams like USMLE, PLAB, AMC, and CORU."
  },
  {
    question: "Do you assist with the DataFlow verification process?",
    answer: "Yes! We provide end-to-end assistance with the DataFlow primary source verification process, credentialing, and exam booking so you can focus entirely on your exam preparation."
  },
  {
    question: "Are your classes online or offline?",
    answer: "We offer both online and offline (classroom) training formats. Our online classes are interactive, live, and recorded for future reference, allowing you to study from anywhere in the world."
  },
  {
    question: "How long does the coaching take?",
    answer: "Most of our exam preparation courses run for 30 to 45 days. However, the duration may vary depending on the specific exam and the candidate's existing proficiency level."
  },
  {
    question: "Do you provide study materials and mock tests?",
    answer: "Yes, our comprehensive training packages include updated study materials, question banks, and simulated mock exams that closely mirror the real testing environment."
  },
  {
    question: "Can allied health professionals take these exams?",
    answer: "Absolutely. We offer tailored coaching for Nurses, Physiotherapists, Pharmacists, Lab Technicians, Radiographers, Optometrists, and various other allied health professionals."
  },
  {
    question: "How do I enroll in a course?",
    answer: "You can easily enroll by contacting us via WhatsApp, calling our admissions helpline, or filling out the 'Apply Now' form on our website. Our career counselors will guide you through the process."
  }
];

export default function FAQPage() {
  return (
    <>
      <SchemaMarkup schema={FAQSchema(GENERAL_FAQS)} />
      <SchemaMarkup 
        schema={BreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" }
        ])} 
      />
      
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our courses, licensing exams, and registration processes."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" }
        ]}
      />
      
      <section className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-white/10 md:p-10">
            <h2 className="mb-8 text-center font-display text-2xl font-bold tracking-tight md:text-3xl">General Enquiries</h2>
            <FAQAccordion faqs={GENERAL_FAQS} />
            
            <div className="mt-12 rounded-xl bg-brand-navy p-8 text-center text-white">
              <h3 className="mb-3 font-display text-xl font-bold">Still have questions?</h3>
              <p className="mb-6 text-slate-300">Our career counselors are ready to help you with personalized guidance.</p>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 font-semibold text-brand-navy transition-colors hover:bg-brand-blue"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

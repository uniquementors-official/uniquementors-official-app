import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Privacy Policy - Unique Mentors",
  description: "Read the Unique Mentors privacy policy covering information collection, usage, sharing, retention, cookies, rights and contact details.",
  path: "/privacy-policy"
});

const sections: Array<{ title: string; body?: string; items: string[] }> = [
  {
    title: "Information We Collect",
    items: ["Name", "Contact details including email address, phone number and postal address", "Date of birth", "Educational qualifications and professional details", "Payment information for course enrolment or service fees"]
  },
  {
    title: "How We Use Your Information",
    items: ["Provide training and guidance services.", "Facilitate enrolment and manage accounts.", "Communicate updates about courses, schedules or services.", "Process payments securely.", "Comply with licensing and DataFlow procedures.", "Send promotional material."]
  },
  {
    title: "Information Sharing",
    body: "We do not sell or rent your personal information to third parties. However, we may share information with:",
    items: ["Licensing and regulatory authorities for DataFlow and registration processes.", "Payment gateways for secure transaction processing.", "Third-party service providers who assist in delivering our services and are bound by confidentiality agreements.", "Legal or regulatory bodies when required by law."]
  },
  {
    title: "Data Retention & Security of Information",
    body: "We retain your information for as long as necessary to:",
    items: ["Fulfil the purposes outlined in this policy.", "Comply with legal and regulatory requirements.", "Resolve disputes and enforce agreements.", "Securely delete or anonymize information when it is no longer needed.", "Maintain secure storage with restricted access.", "Regularly monitor systems to prevent unauthorized access or breaches."]
  },
  {
    title: "Your Rights",
    items: ["Access, correct or update your personal information.", "Request deletion of your data, subject to legal or contractual obligations.", "Opt out of promotional communications.", "File a complaint with a data protection authority if your privacy rights are violated."]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="How Unique Mentors collects, uses, protects and manages personal information."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" }
        ]}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container">
          <article className="mx-auto max-w-4xl space-y-10 text-slate-700 dark:text-slate-300">
            <div className="space-y-4 text-base leading-8">
              <p>
                At Unique Mentors, we value your privacy and are committed to safeguarding your personal information. This Privacy Policy explains how we collect, use and protect your data when you interact with our services, including our training programs, online platforms and customer support.
              </p>
              <p>
                We ensure that your personal information is handled responsibly and in compliance with applicable data protection laws. By using our services or providing us with your information, you agree to the practices outlined in this Privacy Policy.
              </p>
              <p>Our goal is to be transparent about how we manage your data and provide you with control over your information.</p>
            </div>

            {sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-brand-ink dark:text-white">{section.title}</h2>
                {section.body ? <p className="leading-7">{section.body}</p> : null}
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-7">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-brand-ink dark:text-white">Cookies and Tracking Technologies</h2>
              <p className="leading-8">
                We use cookies and similar technologies to enhance your experience on our website. Cookies help us analyse site traffic, remember preferences and improve service functionality. You can manage your cookie preferences through your browser settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-brand-ink dark:text-white">Third-Party Links</h2>
              <p className="leading-8">Our website or communications may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-brand-ink dark:text-white">Changes to the Privacy Policy</h2>
              <p className="leading-8">
                Unique Mentors reserves the right to update this Privacy Policy as needed. Changes will be communicated via email or posted on our official website with the updated effective date.
              </p>
            </section>

            <section className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-display text-2xl font-bold text-brand-ink dark:text-white">Contact Information</h2>
              <p className="mt-3 leading-7">For any questions or concerns regarding this Privacy Policy, please contact us:</p>
              <div className="mt-4 space-y-2 text-sm leading-6">
                <p>Email: uniquementorsin@gmail.com</p>
                <p>Phone: +91 95447 74599, 9846905789, 9447141596</p>
                <p>Address: UNIQUE MENTORS, 62/6284A, 1st Floor, Jyothy, Near IMA blood bank, Ernakulathappan Temple Road, Ernakulam - 682016</p>
                <p>Website: {SITE_CONFIG.url}</p>
              </div>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}

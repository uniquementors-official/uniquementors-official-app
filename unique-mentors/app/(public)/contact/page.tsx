import type { Metadata } from "next";
import { ContactForm } from "@/components/common/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/common/Icon";
import { SITE_CONFIG } from "@/lib/constants";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Unique Mentors - Kochi, Kerala",
  description: "Contact Unique Mentors for MOH, DHA, HAAD, CORU exam training, overseas licensing support and free counselling in Kochi, Kerala.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Unique Mentors - Kochi, Kerala"
        subtitle="Send an enquiry and our counselling team will help you choose the right exam, country and licensing pathway."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" }
        ]}
      />
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <ContactForm />
          <aside className="space-y-5">
            <div className="surface p-6">
              <h2 className="font-display text-2xl font-bold">Contact Info</h2>
              <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                <a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-primary">
                  <Icon name="MapPin" className="mt-1 h-5 w-5 text-primary" />
                  {SITE_CONFIG.address.display}
                </a>
                <a href={`tel:${SITE_CONFIG.phone}`} className="flex gap-3 hover:text-primary">
                  <Icon name="Phone" className="h-5 w-5 text-secondary" />
                  {SITE_CONFIG.phone}
                </a>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex gap-3 hover:text-primary">
                  <Icon name="Mail" className="h-5 w-5 text-brand-gold" />
                  {SITE_CONFIG.email}
                </a>
                <p className="flex gap-3">
                  <Icon name="Clock" className="h-5 w-5 text-primary" />
                  Monday to Saturday, 9:00 AM to 6:00 PM
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
              <iframe
                title="Unique Mentors location map"
                src="https://www.google.com/maps?q=Unique%20Mentors%20Kochi&output=embed"
                className="h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

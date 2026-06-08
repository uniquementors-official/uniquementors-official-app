import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";

export function ContactSection() {
  return (
    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="section-tag">Get expert guidance today</span>
          <h2 className="heading-lg mt-4">Speak with a Unique Mentors counsellor</h2>
          <p className="body-lead mt-4">
            Discuss your profession, experience and target country with a team that understands healthcare licensing pathways.
          </p>
          <div className="mt-6 space-y-3 text-sm font-medium text-slate-700 dark:text-slate-200">
            <p className="flex gap-3">
              <Icon name="MapPin" className="h-5 w-5 text-primary" />
              {SITE_CONFIG.address.display}
            </p>
            <p className="flex gap-3">
              <Icon name="Phone" className="h-5 w-5 text-secondary" />
              {SITE_CONFIG.phone}
            </p>
          </div>
        </div>
        <div className="surface p-6">
          <h3 className="font-display text-2xl font-bold">Choose your next step</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button asChild size="lg">
              <Link href="/apply">Apply for Training</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

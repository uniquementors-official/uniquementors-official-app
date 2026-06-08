import Link from "next/link";
import { APP_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { PlayStoreButton } from "@/components/ui/play-store-button";

export function CTASection() {
  const message = encodeURIComponent("Hello Unique Mentors, I want to talk to an expert about overseas medical licensing.");

  return (
    <section className="section-padding bg-gradient-to-br from-slate-950 via-brand-navy to-slate-900 text-white">
      <div className="container text-center">
        <span className="section-tag border-white/20 bg-white/10 text-white">We are happy to help you</span>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl">
          Ready to Start Your Global Healthcare Journey?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-200">
          Join 5000+ healthcare professionals who transformed their careers with Unique Mentors.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="secondary" size="lg">
            <Link href="/apply">Apply Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand-navy">
            <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=${message}`} target="_blank" rel="noopener noreferrer">
              <Icon name="MessageCircle" className="h-4 w-4" />
              Talk to an Expert
            </a>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <AppStoreButton href={APP_LINKS.appStore} variant="light" />
          <PlayStoreButton href={APP_LINKS.playStore} variant="light" />
        </div>
      </div>
    </section>
  );
}

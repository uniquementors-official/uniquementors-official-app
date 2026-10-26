import type { ReactNode } from "react";
import { prisma } from "@/lib/db";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/common/PageTransition";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { CTAPopup } from "@/components/sections/CTAPopup";
import Image from "next/image";
import { unstable_cache } from "next/cache";

const getPublicSiteSettings = unstable_cache(
  async () => {
    try {
      return await prisma.siteSettings.findFirst();
    } catch (error) {
      console.error("public site settings unavailable", error);
      return null;
    }
  },
  ["public-site-settings"],
  { revalidate: 300 }
);

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const settings = await getPublicSiteSettings();
  const showBanner = settings?.announcementOn && settings?.announcement;

  return (
    <>
      {showBanner ? <AnnouncementBanner text={settings.announcement || ""} /> : null}
      <Navbar hasBanner={Boolean(showBanner)} />
      <PageTransition>
        <main className="pb-20 lg:pb-0">{children}</main>
      </PageTransition>
      <Footer customSocialLinks={settings?.socialLinks as any} />
      <WhatsAppButton />
      <CTAPopup />
      <ScrollToTop />
    </>
  );
}

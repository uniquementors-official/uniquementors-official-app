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

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const settings = await prisma.siteSettings.findFirst();
  const showBanner = settings?.announcementOn && settings?.announcement;

  return (
    <>
      {showBanner ? <AnnouncementBanner text={settings.announcement || ""} /> : null}
      <Navbar hasBanner={Boolean(showBanner)} />
      <PageTransition>
        <main className="pb-20 lg:pb-0">{children}</main>
      </PageTransition>
      <Footer />
      <WhatsAppButton />
      <CTAPopup />
      <ScrollToTop />
    </>
  );
}

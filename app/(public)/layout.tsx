import type { ReactNode } from "react";
import { prisma } from "@/lib/db";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/common/PageTransition";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const settings = await prisma.siteSettings.findFirst();
  const showBanner = settings?.announcementOn && settings?.announcement;

  return (
    <>
      {showBanner ? <AnnouncementBanner text={settings.announcement || ""} /> : null}
      <Navbar hasBanner={Boolean(showBanner)} />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}

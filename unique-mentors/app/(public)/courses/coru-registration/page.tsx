import type { Metadata } from "next";
import { ExamLandingPage } from "@/components/common/ExamLandingPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "CORU Registration Support Ireland | Unique Mentors",
  description: "CORU registration guidance for healthcare professionals planning careers in Ireland, including documentation and eligibility review.",
  path: "/courses/coru-registration"
});

export default function CORURegistrationPage() {
  return (
    <ExamLandingPage
      exam="CORU"
      title="CORU Registration Support for Ireland"
      subtitle="Plan your Ireland registration pathway with documentation guidance and professional mentoring."
    />
  );
}

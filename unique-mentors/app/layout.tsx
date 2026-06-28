import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { SchemaMarkup } from "@/components/common/SchemaMarkup";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { LocalBusinessSchema, OrganizationSchema, WebsiteSchema } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-jakarta" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Unique Mentors - Overseas Medical Licensing Exam Training Centre | MOH | DHA | HAAD | Kochi",
    template: "%s | Unique Mentors"
  },
  description:
    "Prepare for MOH, DHA, HAAD, OMSB, QCHP, SCFHS, USMLE, PLAB and AMC exams with Unique Mentors' expert training in Kochi, Kerala. 5000+ successful candidates. GCC DataFlow, medical license processing, career services and finishing school programs. Enroll today!",
  keywords: [
    "MOH exam training Kochi", "DHA exam coaching Kerala", "HAAD exam preparation",
    "prometric coaching centre Kerala", "overseas medical licensing exam",
    "unique mentors", "uniquementors", "GCC Dataflow support",
    "finishing school Kochi", "medical licensing exam training",
    "dha coaching centre near me", "best prometric coaching center in Kerala"
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicons.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico"
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "en-IN": SITE_CONFIG.url
    }
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1 as any,
    "max-video-preview": -1 as any,
    "max-image-preview": "large" as any
  },
  openGraph: {
    type: "website",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Unique Mentors - Overseas Medical Licensing Exam Training Centre | MOH | DHA | HAAD",
    description:
      "Prepare for MOH, DHA, HAAD, OMSB, QCHP, SCFHS exams with Unique Mentors' expert training in Kochi, Kerala. GCC DataFlow, medical license processing and career services.",
    images: [{ url: "/images/metro-pillar-candidate.png", width: 1200, height: 630, alt: "Unique Mentors - Overseas Medical Licensing Exam Training Centre Kochi" }],
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Unique Mentors - Overseas Medical Licensing Exam Training Centre | MOH | DHA | HAAD",
    description: "Overseas medical licensing exam training in Kochi. MOH, DHA, HAAD, USMLE, PLAB, AMC coaching. 5000+ successful candidates."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061733"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <ThemeProvider>
          <SchemaMarkup schema={[OrganizationSchema(), LocalBusinessSchema(), WebsiteSchema()]} />
          {gaId ? (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
              <Script id="google-analytics" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
              </Script>
            </>
          ) : null}
          <PostHogProvider>{children}</PostHogProvider>
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

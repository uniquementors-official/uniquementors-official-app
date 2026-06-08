import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { SchemaMarkup } from "@/components/common/SchemaMarkup";
import { LocalBusinessSchema, OrganizationSchema, WebsiteSchema } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-jakarta" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Unique Mentors | MOH DHA HAAD Exam Training Centre, Kochi",
    template: "%s | Unique Mentors"
  },
  description:
    "Expert MOH, DHA and HAAD exam coaching in Kochi. Overseas licensing, GCC Dataflow and Finishing School programs for Indian healthcare professionals.",
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
  openGraph: {
    type: "website",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Unique Mentors | MOH DHA HAAD Exam Training Centre, Kochi",
    description:
      "Expert MOH, DHA and HAAD exam coaching in Kochi with overseas licensing, Dataflow and finishing school support.",
    images: [{ url: "/images/metro-pillar-candidate.png", width: 1200, height: 630, alt: "Unique Mentors training centre in Kochi" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Unique Mentors | MOH DHA HAAD Exam Training Centre, Kochi",
    description: "Overseas medical licensing exam training and career mentorship in Kochi."
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
          {children}
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

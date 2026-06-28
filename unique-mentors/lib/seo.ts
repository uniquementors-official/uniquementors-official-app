import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import type { BlogPost, Course, FaqItem } from "@/types";

/* ────────────────────────────────────────────────────────────────────────────
 * DEFAULT KEYWORDS — high-value, long-tail terms from old WordPress site
 * plus competitive additions for GEO (Generative Engine Optimization)
 * ──────────────────────────────────────────────────────────────────────── */
const DEFAULT_KEYWORDS = [
  // Brand
  "unique mentors", "uniquementors", "unique mentors kochi",

  // Core exams
  "MOH exam training Kochi", "DHA exam coaching Kerala", "HAAD exam preparation",
  "OMSB exam training", "QCHP exam preparation", "SCFHS exam coaching",
  "NHRA exam Bahrain", "USMLE training India", "PLAB training Kochi",
  "AMC exam coaching", "ADC exam preparation", "APC exam Australia",
  "HCPC registration UK", "CORU registration Ireland",

  // Prometric / licensing
  "prometric coaching centre Kerala", "prometric exam for physiotherapist",
  "prometric exam for lab technician", "best prometric coaching center in Kerala",
  "dha coaching centre near me", "dha coaching centre in Kerala",
  "dha exam for physiotherapist", "moh exam for physiotherapist",
  "haad exam for lab technician", "overseas medical licensing exam",

  // Services
  "GCC Dataflow support", "GCC medical license processing",
  "medical licensing exam training", "finishing school Kochi",
  "healthcare career guidance India", "western country medical license",

  // Location + general
  "overseas licensing exam training centre Kochi",
  "medical exam coaching centre Kochi Kerala",
  "healthcare professional training India"
];

/* ────────────────────────────────────────────────────────────────────────────
 * METADATA GENERATOR — used by every page
 * ──────────────────────────────────────────────────────────────────────── */
type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
};

export function generateMetadata({
  title,
  description,
  path = "/",
  image = "/images/metro-pillar-candidate.png",
  noIndex = false,
  keywords = []
}: MetadataInput): Metadata {
  const canonical = new URL(path, SITE_CONFIG.url).toString();
  const imageUrl = image.startsWith("http") ? image : new URL(image, SITE_CONFIG.url).toString();

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: {
      canonical,
      languages: {
        "en-IN": canonical
      }
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      "max-snippet": -1 as any,
      "max-video-preview": -1 as any,
      "max-image-preview": "large" as any
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} - Overseas Medical Licensing Exam Training Centre Kochi`
        }
      ],
      locale: "en_IN"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

/* ────────────────────────────────────────────────────────────────────────────
 * PER-CONTENT-TYPE METADATA
 * ──────────────────────────────────────────────────────────────────────── */

export function generateBlogMetadata(blog: BlogPost): Metadata {
  return generateMetadata({
    title: `${blog.title} | Unique Mentors Blog`,
    description: blog.excerpt,
    path: `/blog/${blog.slug}`,
    image: blog.coverImage,
    keywords: blog.tags
  });
}

export function generateCourseMetadata(course: Course): Metadata {
  return generateMetadata({
    title: `${course.title} | Unique Mentors Kochi`,
    description: course.excerpt,
    path: `/courses/${course.slug}`,
    image: course.coverImage,
    keywords: [
      course.examType,
      course.profession,
      course.country,
      "medical licensing course",
      `${course.examType} exam for ${course.profession}`,
      `${course.examType} coaching centre Kochi`
    ]
  });
}

/* ────────────────────────────────────────────────────────────────────────────
 * STRUCTURED DATA / JSON-LD SCHEMAS
 * ──────────────────────────────────────────────────────────────────────── */

export function OrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "MedicalOrganization"],
    name: SITE_CONFIG.name,
    alternateName: "Unique Mentors Overseas Medical Licensing Exam Training Centre",
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.svg`,
    image: `${SITE_CONFIG.url}/images/metro-pillar-candidate.png`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    foundingDate: SITE_CONFIG.established,
    founder: SITE_CONFIG.founders.map((name) => ({ "@type": "Person", name })),
    sameAs: [
      ...Object.values(SITE_CONFIG.social),
      "https://x.com/unique_mentors"
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.locality,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "738",
      bestRating: "5"
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "30+"
    }
  };
}

export function LocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}/logo.svg`,
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1st Floor, Jyothy Near IMA blood bank, Ernakulathappan Temple Road",
      addressLocality: "Kochi",
      addressRegion: "Kerala",
      postalCode: "682016",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.970652699999999,
      longitude: 76.28303
    },
    hasMap: "https://www.google.com/maps?cid=14480370942990641303",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "17:30"
      }
    ],
    areaServed: [
      "UAE", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain",
      "Ireland", "Canada", "Australia", "United Kingdom", "United States", "India"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "738",
      bestRating: "5"
    },
    sameAs: [
      ...Object.values(SITE_CONFIG.social),
      "https://x.com/unique_mentors"
    ]
  };
}

export function CourseSchema(course: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.name,
      sameAs: SITE_CONFIG.url
    },
    courseMode: course.mode,
    educationalCredentialAwarded: `${course.examType} licensing exam preparation`,
    url: `${SITE_CONFIG.url}/courses/${course.slug}`,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.mode === "Hybrid" ? ["Online", "Onsite"] : course.mode,
      courseWorkload: course.duration,
      instructor: SITE_CONFIG.founders.map((name) => ({ "@type": "Person", name }))
    },
    offers: {
      "@type": "Offer",
      category: "Training",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      price: "0",
      description: course.fees
    }
  };
}

export function BlogPostSchema(blog: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage,
    datePublished: blog.publishedAt,
    dateModified: blog.publishedAt,
    author: {
      "@type": "Organization",
      name: blog.author
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.svg`
      }
    },
    mainEntityOfPage: `${SITE_CONFIG.url}/blog/${blog.slug}`
  };
}

export function BreadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.href, SITE_CONFIG.url).toString()
    }))
  };
}

export function FAQSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function WebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    alternateName: "Unique Mentors",
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_CONFIG.url}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function ServiceSchema(service: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url
    },
    areaServed: [
      "UAE", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain",
      "Ireland", "Canada", "Australia", "United Kingdom", "United States", "India"
    ],
    serviceType: "Healthcare Professional Training"
  };
}

export function VideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  embedUrl: string;
  uploadDate: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    uploadDate: video.uploadDate,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.svg`
      }
    }
  };
}

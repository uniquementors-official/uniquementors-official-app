import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import type { BlogPost, Course, FaqItem } from "@/types";

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
  image = "/images/og-image.jpg",
  noIndex = false,
  keywords = []
}: MetadataInput): Metadata {
  const canonical = new URL(path, SITE_CONFIG.url).toString();
  const imageUrl = image.startsWith("http") ? image : new URL(image, SITE_CONFIG.url).toString();

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title,
    description,
    keywords: [
      "MOH exam training Kochi",
      "DHA exam coaching Kerala",
      "HAAD exam preparation",
      "medical licensing exam training",
      "GCC Dataflow support",
      ...keywords
    ],
    alternates: {
      canonical,
      languages: {
        "en-IN": canonical
      }
    },
    robots: {
      index: !noIndex,
      follow: !noIndex
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
          alt: `${SITE_CONFIG.name} medical licensing exam training centre`
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
    keywords: [course.examType, course.profession, course.country, "medical licensing course"]
  });
}

export function OrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "MedicalOrganization"],
    name: SITE_CONFIG.name,
    alternateName: "Unique Mentors Overseas Medical Licensing Exam Training Centre",
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    foundingDate: SITE_CONFIG.established,
    founder: SITE_CONFIG.founders.map((name) => ({ "@type": "Person", name })),
    sameAs: Object.values(SITE_CONFIG.social),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.locality,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country
    }
  };
}

export function LocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.locality,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00"
      }
    ],
    areaServed: ["UAE", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain", "Ireland", "Canada", "Australia"]
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
        url: `${SITE_CONFIG.url}/images/logo.png`
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
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_CONFIG.url}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

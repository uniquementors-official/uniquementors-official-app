export type ExamType = "MOH" | "DHA" | "HAAD" | "CORU" | "CANADA" | "AUSTRALIA" | "WESTERN";

export type ContentStatus = "draft" | "published";

export type LeadStatus = "new" | "contacted" | "enrolled" | "closed";

export type LeadSource = "contact" | "apply" | "whatsapp" | "manual";

export type FaqItem = {
  question: string;
  answer: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  examType: ExamType;
  examTypes: ExamType[];
  profession: string;
  country: string;
  duration: string;
  mode: "Online" | "Offline" | "Hybrid";
  fees: string;
  nextBatch: string;
  excerpt: string;
  description: string;
  eligibility: string[];
  highlights: string[];
  syllabus: string[];
  faqs: FaqItem[];
  featured: boolean;
  status: ContentStatus;
  coverImage: string;
  imageAlt: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  imageAlt: string;
  author: string;
  readTime: number;
  publishedAt: string;
  featured: boolean;
  status: ContentStatus;
};

export type Testimonial = {
  id: string;
  name: string;
  initials: string;
  profession: string;
  examType: string;
  country: string;
  rating: number;
  review: string;
  featured: boolean;
  visible: boolean;
};

export type ServiceItem = {
  title: string;
  slug: string;
  icon: string;
  description: string;
  features: string[];
  href: string;
};

export type StatItem = {
  value: number;
  suffix: string;
  label: string;
  icon: string;
};

export type NavItem = {
  label: string;
  href: string;
  items?: Array<{
    label: string;
    href: string;
    description?: string;
    group?: string;
  }>;
};

export type LeadPayload = {
  name: string;
  email?: string;
  phone: string;
  profession?: string;
  examType?: string;
  message?: string;
  source: LeadSource;
};

export type EventItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  eventDate: string;
  location: string;
  coverImage?: string;
  status: ContentStatus;
  createdAt?: string;
};

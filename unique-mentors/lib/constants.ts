import type { NavItem, ServiceItem, StatItem } from "@/types";

export const SITE_CONFIG = {
  name: "Unique Mentors",
  tagline: "Empowering Global Healthcare Careers",
  description:
    "India's premier overseas medical licensing exam training centre in Kochi, Kerala. Expert coaching for MOH, DHA, HAAD and CORU exams, finishing school programs, Dataflow support and GCC or Western country medical license processing for healthcare professionals.",
  url: "https://www.uniquementors.com",
  phone: "+91-9846905789",
  whatsapp: "+91-9846905789",
  email: "info@uniquementors.com",
  address: {
    street: "1st Floor, Jyothy, Near IMA Blood Bank, Ernakulathappan Temple Road",
    locality: "Kochi",
    region: "Kerala",
    postalCode: "682016",
    country: "IN",
    display: "1st Floor, Jyothy, Near IMA Blood Bank, Ernakulathappan Temple Road, Kochi, Kerala 682016"
  },
  founders: ["Dr. Deepa Seira Babu", "Dr. Praveena Prathapachandran"],
  established: "2020",
  social: {
    facebook: "https://www.facebook.com/UniqueMentors/",
    instagram: "https://www.instagram.com/unique_mentors/",
    youtube: "https://www.youtube.com/@uniquementors",
    linkedin: "https://www.linkedin.com/company/uniquementors/"
  },
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Unique%20Mentors%20Kochi"
} as const;

export const APP_LINKS = {
  login: "https://app.uniquementors.com/login",
  appStore: "https://apps.apple.com/in/app/unique-mentors/id6758348129",
  playStore: "https://play.google.com/store/apps/details?id=com.hari401.myapp&pcampaignid=web_share"
} as const;

export const EXAM_TYPES = [
  { label: "MOH", value: "MOH", description: "Ministry of Health UAE exam training" },
  { label: "DHA", value: "DHA", description: "Dubai Health Authority exam coaching" },
  { label: "HAAD", value: "HAAD", description: "Abu Dhabi healthcare licensing exam preparation" },
  { label: "CORU", value: "CORU", description: "Ireland health and social care registration guidance" },
  { label: "CANADA", value: "CANADA", description: "Canadian healthcare licensing support" },
  { label: "AUSTRALIA", value: "AUSTRALIA", description: "Australian healthcare registration support" }
] as const;

export const PROFESSIONS = [
  { label: "Lab Technician / Technologist", icon: "Microscope" },
  { label: "Microbiologist", icon: "FlaskConical" },
  { label: "Radiographer", icon: "Scan" },
  { label: "Pharmacist", icon: "Pill" },
  { label: "General Practitioner", icon: "Stethoscope" },
  { label: "General Dentist", icon: "Smile" },
  { label: "Ayush Physician", icon: "Leaf" },
  { label: "Physiotherapist", icon: "Activity" },
  { label: "Nurse", icon: "HeartPulse" }
] as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    items: [
      {
        label: "Overseas Licensing Exam",
        href: "/services/overseas-licensing-exam",
        description: "MOH, DHA, HAAD and CORU exam preparation"
      },
      {
        label: "Finishing School",
        href: "/services/finishing-school",
        description: "Communication, leadership and global career readiness"
      },
      {
        label: "GCC & Western License Processing",
        href: "/services/gcc-western-license-processing",
        description: "Dataflow, documentation and licensing support"
      }
    ]
  },
  {
    label: "Courses",
    href: "/courses",
    items: [
      { label: "MOH Exam Training", href: "/courses/moh-exam-training", group: "By Exam" },
      { label: "DHA Exam Training", href: "/courses/dha-exam-training", group: "By Exam" },
      { label: "HAAD Exam Training", href: "/courses/haad-exam-training", group: "By Exam" },
      { label: "CORU Registration", href: "/courses/coru-registration", group: "By Exam" },
      { label: "UAE Licensing", href: "/courses?country=UAE", group: "By Country" },
      { label: "Ireland Registration", href: "/courses?country=Ireland", group: "By Country" },
      { label: "Canada Licensing", href: "/courses?country=Canada", group: "By Country" },
      { label: "Australia Licensing", href: "/courses?country=Australia", group: "By Country" },
      { label: "Lab Technicians", href: "/courses?profession=Lab%20Technician", group: "By Profession" },
      { label: "Pharmacists", href: "/courses?profession=Pharmacist", group: "By Profession" },
      { label: "Radiographers", href: "/courses?profession=Radiographer", group: "By Profession" }
    ]
  },
  { label: "Blog", href: "/blog" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" }
];

export const FOOTER_LINKS = {
  explore: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Courses", href: "/courses" },
    { label: "Blog", href: "/blog" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
    { label: "Apply Now", href: "/apply" }
  ],
  services: [
    { label: "Overseas Licensing Exam", href: "/services/overseas-licensing-exam" },
    { label: "MOH Training", href: "/courses/moh-exam-training" },
    { label: "DHA Training", href: "/courses/dha-exam-training" },
    { label: "HAAD Training", href: "/courses/haad-exam-training" },
    { label: "CORU Registration", href: "/courses/coru-registration" },
    { label: "Finishing School", href: "/services/finishing-school" },
    { label: "GCC License Processing", href: "/services/gcc-western-license-processing" }
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" }
  ]
};

export const STATS: StatItem[] = [
  { value: 5000, suffix: "+", label: "Healthcare Professionals Trained", icon: "Users" },
  { value: 95, suffix: "%", label: "Exam Pass Rate", icon: "Percent" },
  { value: 11, suffix: "+", label: "Countries Served", icon: "Globe2" },
  { value: 8, suffix: "+", label: "Exam Types Covered", icon: "FileCheck" },
  { value: 5, suffix: "★", label: "Student Rating", icon: "Star" }
];

export const SERVICES: ServiceItem[] = [
  {
    title: "Overseas Medical Licensure Exam Training",
    slug: "overseas-licensing-exam",
    icon: "GraduationCap",
    description:
      "Structured coaching for MOH, DHA, HAAD, CORU and Western licensing exams with profession-specific mentoring and exam strategy.",
    features: ["MOH", "DHA", "HAAD", "CORU"],
    href: "/services/overseas-licensing-exam"
  },
  {
    title: "GCC & Western Medical License Processing",
    slug: "gcc-western-license-processing",
    icon: "FileCheck",
    description:
      "End-to-end Dataflow, documentation, eligibility review and licensing support for GCC and Western healthcare destinations.",
    features: ["UAE", "Saudi", "Ireland", "Canada"],
    href: "/services/gcc-western-license-processing"
  },
  {
    title: "Finishing School Program",
    slug: "finishing-school",
    icon: "Star",
    description:
      "Communication, leadership, cultural awareness, interview preparation and professional etiquette for global healthcare workplaces.",
    features: ["Communication", "Leadership", "Etiquette", "Interviews"],
    href: "/services/finishing-school"
  },
  {
    title: "Career Mentorship & Counselling",
    slug: "career-mentorship",
    icon: "Users",
    description:
      "One-on-one guidance to choose the right exam, country, documentation path and career roadmap with transparent next steps.",
    features: ["Career Roadmap", "CV Review", "1-on-1", "Interview Prep"],
    href: "/contact"
  }
];

export const COUNTRIES_SERVED = [
  "UAE",
  "Saudi Arabia",
  "Abu Dhabi",
  "Dubai",
  "Qatar",
  "Oman",
  "Kuwait",
  "Bahrain",
  "Ireland",
  "Canada",
  "Australia"
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Blog Posts", href: "/admin/blogs", icon: "FileText" },
  { label: "Events", href: "/admin/events", icon: "Calendar" },
  { label: "Courses", href: "/admin/courses", icon: "BookOpen" },
  { label: "Leads", href: "/admin/leads", icon: "Users" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "Star" },
  { label: "Newsletter", href: "/admin/newsletter", icon: "Mail" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" }
] as const;

export const PHONE_DISPLAY = "+91 98469 05789";

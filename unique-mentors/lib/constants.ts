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
  { label: "AUSTRALIA", value: "AUSTRALIA", description: "Australian healthcare registration support" },
  { label: "OMSB", value: "OMSB", description: "Oman Medical Specialty Board exam" },
  { label: "QCHP", value: "QCHP", description: "Qatar Council for Healthcare Practitioners exam" },
  { label: "SCFHS", value: "SCFHS", description: "Saudi Commission for Health Specialties exam" },
  { label: "NHRA", value: "NHRA", description: "National Health Regulatory Authority Bahrain exam" },
  { label: "HCPC", value: "HCPC", description: "UK Health and Care Professions Council registration" },
  { label: "ADC", value: "ADC", description: "Australian Dental Council exam" },
  { label: "APC", value: "APC", description: "Australian Physiotherapy Council exam" },
  { label: "AMC", value: "AMC", description: "Australian Medical Council exam" },
  { label: "USMLE", value: "USMLE", description: "US Medical Licensure Examination" },
  { label: "PLAB", value: "PLAB", description: "Professional and Linguistic Assessments Board UK exam" }
] as const;

export const PROFESSIONS = [
  { label: "General Practitioners", icon: "Stethoscope" },
  { label: "General Dentist", icon: "Smile" },
  { label: "Ayurveda / Homeo / Unani / Naturopathy Physicians", icon: "Leaf" },
  { label: "Physiotherapists", icon: "Activity" },
  { label: "Lab Technician / Technologist", icon: "Microscope" },
  { label: "Microbiologist", icon: "FlaskConical" },
  { label: "Radiographer", icon: "Scan" },
  { label: "Pharmacist", icon: "Pill" },
  { label: "Anesthesia Technicians and Technologists", icon: "Syringe" },
  { label: "Optometrist", icon: "Eye" },
  { label: "Nurses", icon: "HeartPulse" }
] as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    items: [
      {
        label: "Overseas Licensing Exam Training",
        href: "/services/overseas-licensing-exam",
        description: "MOH, DHA, HAAD, CORU and international exam preparation"
      },
      {
        label: "GCC DataFlow & Exam Registration",
        href: "/services/gcc-dataflow",
        description: "End-to-end Dataflow, documentation and licensing registration"
      },
      {
        label: "Western Licensing",
        href: "/services/western-licensing",
        description: "USA, UK, Australia and Canada healthcare licensing"
      },
      {
        label: "English Language Training",
        href: "/services/english-training",
        description: "IELTS, OET and PTE preparation"
      },
      {
        label: "Medical Council Registration",
        href: "/services/council-registration",
        description: "Medical council and regulatory body registration support"
      },
      {
        label: "BLS & ACLS Training",
        href: "/services/bls-acls",
        description: "Certified Basic and Advanced Life Support courses"
      },
      {
        label: "Career Services",
        href: "/services/career-services",
        description: "Resume, CV, LinkedIn, career guidance and interview prep"
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
      { label: "USMLE Training", href: "/courses/usmle-exam-training", group: "By Exam" },
      { label: "PLAB Training", href: "/courses/plab-exam-training", group: "By Exam" },
      { label: "AMC Training", href: "/courses/amc-exam-training", group: "By Exam" },
      { label: "UAE Licensing", href: "/courses?country=UAE", group: "By Country" },
      { label: "Ireland Registration", href: "/courses?country=Ireland", group: "By Country" },
      { label: "Canada Licensing", href: "/courses?country=Canada", group: "By Country" },
      { label: "Australia Licensing", href: "/courses?country=Australia", group: "By Country" },
      { label: "General Practitioners", href: "/courses?profession=General%20Practitioner", group: "By Profession" },
      { label: "General Dentist", href: "/courses?profession=Dentist", group: "By Profession" },
      { label: "Ayurveda / Homeo / Unani", href: "/courses?profession=Ayush%20Physician", group: "By Profession" },
      { label: "Physiotherapists", href: "/courses?profession=Physiotherapist", group: "By Profession" },
      { label: "Lab Technician / Technologist", href: "/courses?profession=Lab%20Technician", group: "By Profession" },
      { label: "Microbiologist", href: "/courses?profession=Microbiologist", group: "By Profession" },
      { label: "Radiographer", href: "/courses?profession=Radiographer", group: "By Profession" },
      { label: "Pharmacist", href: "/courses?profession=Pharmacist", group: "By Profession" },
      { label: "Anesthesia Technicians", href: "/courses?profession=Anesthesia%20Technician", group: "By Profession" },
      { label: "Optometrist", href: "/courses?profession=Optometrist", group: "By Profession" },
      { label: "Nurses", href: "/courses?profession=Nurse", group: "By Profession" }
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
    { label: "Overseas Licensing Exam Training", href: "/services/overseas-licensing-exam" },
    { label: "GCC DataFlow & Exam Registration", href: "/services/gcc-dataflow" },
    { label: "Western Licensing", href: "/services/western-licensing" },
    { label: "English Language Training", href: "/services/english-training" },
    { label: "Medical Council Registration", href: "/services/council-registration" },
    { label: "BLS & ACLS Training", href: "/services/bls-acls" },
    { label: "Career Services", href: "/services/career-services" },
    { label: "Google Reviews", href: "https://www.google.com/search?q=uniquementors#lrd=0x3b0872b056b763a7:0xc8f58c36b4233897,1,,,," }
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" }
  ]
};

export const STATS: StatItem[] = [
  { value: 5000, suffix: "+", label: "Students Trained", icon: "Users" },
  { value: 95, suffix: "%", label: "Exam Pass Rate", icon: "Percent" },
  { value: 11, suffix: "+", label: "Countries Served", icon: "Globe2" },
  { value: 500, suffix: "+", label: "Google Reviews", icon: "Star" },
  { value: 100, suffix: "+", label: "Video Testimonials", icon: "Video" }
];

export const SERVICES: ServiceItem[] = [
  {
    title: "Overseas Licensing Exam Training",
    slug: "overseas-licensing-exam",
    icon: "GraduationCap",
    description: "Structured coaching for global licensing exams with profession-specific mentoring and exam strategy.",
    features: ["Training", "Mock Exams", "Study Materials"],
    href: "/services/overseas-licensing-exam"
  },
  {
    title: "GCC DataFlow & Exam Registration",
    slug: "gcc-dataflow",
    icon: "FileCheck",
    description: "End-to-end Dataflow, documentation, eligibility review and licensing application support for GCC countries.",
    features: ["Dataflow", "Registration", "Eligibility"],
    href: "/services/gcc-dataflow"
  },
  {
    title: "Western Licensing",
    slug: "western-licensing",
    icon: "Globe2",
    description: "Comprehensive guidance and processing for healthcare licensing in Western destinations.",
    features: ["USA", "UK", "Australia", "Canada"],
    href: "/services/western-licensing"
  },
  {
    title: "English Language Training",
    slug: "english-training",
    icon: "MessageSquare",
    description: "Focused preparation for IELTS, OET and other essential language proficiency requirements.",
    features: ["IELTS", "OET", "PTE"],
    href: "/services/english-training"
  },
  {
    title: "Medical Council Registration",
    slug: "council-registration",
    icon: "BadgeCheck",
    description: "Expert assistance with respective medical councils and regulatory body registrations.",
    features: ["Verification", "Support"],
    href: "/services/council-registration"
  },
  {
    title: "BLS & ACLS Training",
    slug: "bls-acls",
    icon: "HeartPulse",
    description: "Certified Basic Life Support (BLS) and Advanced Cardiovascular Life Support (ACLS) courses.",
    features: ["Certification", "Practical Skills"],
    href: "/services/bls-acls"
  },
  {
    title: "Career Services",
    slug: "career-services",
    icon: "Briefcase",
    description: "Comprehensive career support including resume building, LinkedIn profile assistance, and interview preparation.",
    features: ["CV Creation", "LinkedIn", "Interviews"],
    href: "/services/career-services"
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
  { label: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "Star" },
  { label: "Newsletter", href: "/admin/newsletter", icon: "Mail" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" }
] as const;

export const PHONE_DISPLAY = "+91 98469 05789";

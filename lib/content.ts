import type { BlogPost, Course, FaqItem, Testimonial } from "@/types";

export const COMMON_FAQS: FaqItem[] = [
  {
    question: "Which medical licensing exams does Unique Mentors train for?",
    answer:
      "Unique Mentors trains healthcare professionals for MOH, DHA, HAAD, CORU and selected Western country licensing or registration pathways."
  },
  {
    question: "Can I get help with Dataflow and document verification?",
    answer:
      "Yes. The licensing team reviews eligibility, organizes documents, supports Dataflow submissions and guides candidates through country-specific processes."
  },
  {
    question: "Do you offer online and offline classes?",
    answer:
      "Training is available in flexible online, offline and hybrid formats, depending on the course, batch schedule and the candidate's location."
  },
  {
    question: "How do I know which exam or country is right for me?",
    answer:
      "A counsellor reviews your qualification, experience, profession and target timeline, then recommends the most suitable exam and licensing route."
  }
];

const defaultSyllabus = [
  "Exam pattern, eligibility and licensing process orientation",
  "Profession-specific core concepts and high-yield topics",
  "Question bank practice with timed mock exams",
  "Dataflow, documentation and application guidance",
  "Interview readiness and career counselling"
];

const defaultEligibility = [
  "Recognized healthcare qualification in the selected profession",
  "Valid registration or council certificate where applicable",
  "Relevant professional experience based on target authority rules",
  "Passport, academic documents and employment records for verification"
];

const defaultHighlights = [
  "Expert faculty with overseas licensing experience",
  "Structured study plan and mock test review",
  "Personal counselling for exam and country selection",
  "Dataflow and application support from documentation experts"
];

export const COURSES: Course[] = [
  {
    id: "course-lab-tech-moh",
    title: "Lab Technician / Technologist - MOH Exam Training",
    slug: "lab-technician-moh-exam-training",
    examType: "MOH",
    examTypes: ["MOH", "DHA", "HAAD"],
    profession: "Lab Technician / Technologist",
    country: "UAE",
    duration: "8 weeks",
    mode: "Hybrid",
    fees: "Contact counselling team",
    nextBatch: "Every month",
    excerpt:
      "Focused MOH, DHA and HAAD exam preparation for laboratory professionals planning healthcare careers in the UAE.",
    description:
      "This course helps laboratory technicians and technologists prepare for overseas healthcare licensing exams with topic-wise coaching, mock tests, documentation support and practical exam strategy.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Laboratory professional preparing diagnostic samples for medical licensing training"
  },
  {
    id: "course-lab-tech-dha",
    title: "Lab Technician / Technologist - DHA Exam Training",
    slug: "lab-technician-dha-exam-training",
    examType: "DHA",
    examTypes: ["DHA", "MOH", "HAAD"],
    profession: "Lab Technician / Technologist",
    country: "Dubai",
    duration: "8 weeks",
    mode: "Hybrid",
    fees: "Contact counselling team",
    nextBatch: "Every month",
    excerpt: "Dubai Health Authority exam coaching for lab professionals with mock tests and eligibility guidance.",
    description:
      "DHA-focused lab technician coaching combines core theory, clinical laboratory reasoning, exam-style practice and step-by-step application support for Dubai licensing.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Medical laboratory setup used for DHA lab technician exam preparation"
  },
  {
    id: "course-lab-tech-haad",
    title: "Lab Technician / Technologist - HAAD Exam Training",
    slug: "lab-technician-haad-exam-training",
    examType: "HAAD",
    examTypes: ["HAAD", "MOH", "DHA"],
    profession: "Lab Technician / Technologist",
    country: "Abu Dhabi",
    duration: "8 weeks",
    mode: "Hybrid",
    fees: "Contact counselling team",
    nextBatch: "Every month",
    excerpt: "HAAD exam preparation for laboratory candidates targeting Abu Dhabi healthcare careers.",
    description:
      "The HAAD lab technician program prepares candidates for Abu Dhabi licensing with structured content, practice exams, score improvement reviews and documentation support.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Healthcare professional reviewing HAAD exam notes in a training centre"
  },
  {
    id: "course-microbiologist",
    title: "Microbiologist Licensing Exam Training",
    slug: "microbiologist-licensing-exam-training",
    examType: "MOH",
    examTypes: ["MOH", "DHA", "HAAD"],
    profession: "Microbiologist",
    country: "GCC",
    duration: "8 weeks",
    mode: "Online",
    fees: "Contact counselling team",
    nextBatch: "Every month",
    excerpt: "MOH, DHA and HAAD coaching for microbiologists with focused theory and practice tests.",
    description:
      "A licensing exam program for microbiology professionals covering diagnostic microbiology, infection control, laboratory standards and authority-specific question patterns.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Microbiologist working with samples during medical licensing exam preparation"
  },
  {
    id: "course-radiographer",
    title: "Radiographer Licensing Exam Training",
    slug: "radiographer-licensing-exam-training",
    examType: "DHA",
    examTypes: ["MOH", "DHA", "HAAD"],
    profession: "Radiographer",
    country: "GCC",
    duration: "8 weeks",
    mode: "Hybrid",
    fees: "Contact counselling team",
    nextBatch: "Every month",
    excerpt: "Exam coaching for radiographers covering imaging principles, safety and licensing pathways.",
    description:
      "Radiographer candidates receive structured exam preparation in imaging protocols, radiation safety, clinical decision-making and licensing documentation.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Radiology department equipment for radiographer licensing training"
  },
  {
    id: "course-pharmacist",
    title: "Pharmacist Licensing Exam Training",
    slug: "pharmacist-licensing-exam-training",
    examType: "HAAD",
    examTypes: ["MOH", "DHA", "HAAD"],
    profession: "Pharmacist",
    country: "GCC",
    duration: "10 weeks",
    mode: "Online",
    fees: "Contact counselling team",
    nextBatch: "Every month",
    excerpt: "Pharmacist exam preparation for GCC licensing with clinical pharmacy and mock test support.",
    description:
      "A pharmacy licensing program focused on therapeutics, pharmacology, calculations, ethics, drug safety and authority-specific practice questions.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pharmacist reviewing medication shelves for licensing exam preparation"
  },
  {
    id: "course-gp",
    title: "General Practitioner Licensing Exam Training",
    slug: "general-practitioner-licensing-exam-training",
    examType: "MOH",
    examTypes: ["MOH", "DHA", "HAAD"],
    profession: "General Practitioner",
    country: "GCC",
    duration: "12 weeks",
    mode: "Hybrid",
    fees: "Contact counselling team",
    nextBatch: "Every month",
    excerpt: "High-yield licensing exam training for doctors targeting MOH, DHA and HAAD pathways.",
    description:
      "General practitioner training covers internal medicine, emergency care, pediatrics, obstetrics, ethics and mock exams aligned with GCC licensing expectations.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Doctor using a tablet while preparing for overseas medical licensing exam"
  },
  {
    id: "course-dentist",
    title: "General Dentist Licensing Exam Training",
    slug: "general-dentist-licensing-exam-training",
    examType: "DHA",
    examTypes: ["MOH", "DHA", "HAAD"],
    profession: "General Dentist",
    country: "GCC",
    duration: "10 weeks",
    mode: "Hybrid",
    fees: "Contact counselling team",
    nextBatch: "Every month",
    excerpt: "Dental licensing exam coaching for MOH, DHA and HAAD candidates with clinical scenario practice.",
    description:
      "Dentists receive exam-oriented coaching across operative dentistry, oral medicine, periodontics, prosthodontics, radiology, ethics and application support.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Dental professional preparing for GCC licensing exam"
  },
  {
    id: "course-ayush",
    title: "Ayurveda, Homeo, Unani and Naturopathy Physician Licensing",
    slug: "ayush-physicians-licensing-exam-training",
    examType: "MOH",
    examTypes: ["MOH", "DHA", "HAAD"],
    profession: "Ayush Physician",
    country: "GCC",
    duration: "8 weeks",
    mode: "Online",
    fees: "Contact counselling team",
    nextBatch: "Every month",
    excerpt: "Licensing exam guidance for Ayurveda, Homeo, Unani and Naturopathy physicians seeking overseas roles.",
    description:
      "This program supports Ayush professionals with eligibility review, documentation, exam topic planning, mock practice and country-specific guidance.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: false,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Healthcare counselling desk for Ayush physician licensing support"
  },
  {
    id: "course-coru",
    title: "CORU Registration - Ireland",
    slug: "coru-registration-ireland",
    examType: "CORU",
    examTypes: ["CORU"],
    profession: "Healthcare Professional",
    country: "Ireland",
    duration: "Documentation timeline varies",
    mode: "Online",
    fees: "Contact counselling team",
    nextBatch: "Open counselling slots",
    excerpt: "CORU registration support for healthcare professionals planning careers in Ireland.",
    description:
      "CORU registration guidance covers eligibility review, document preparation, portfolio organization and submission planning for Ireland-bound healthcare professionals.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: true,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Ireland destination landscape representing CORU registration support"
  },
  {
    id: "course-canada-dentist",
    title: "General Dentist - Canada Licensing",
    slug: "general-dentist-canada-licensing",
    examType: "CANADA",
    examTypes: ["CANADA", "WESTERN"],
    profession: "General Dentist",
    country: "Canada",
    duration: "Counselling-led pathway",
    mode: "Online",
    fees: "Contact counselling team",
    nextBatch: "Open counselling slots",
    excerpt: "Guidance for dentists exploring Canadian licensing pathways and documentation readiness.",
    description:
      "Canada dental licensing support helps candidates understand pathway options, documentation expectations, timelines and preparation milestones.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: false,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Canadian city skyline representing dental licensing guidance for Canada"
  },
  {
    id: "course-australia-dentist",
    title: "General Dentist - Australia Licensing",
    slug: "general-dentist-australia-licensing",
    examType: "AUSTRALIA",
    examTypes: ["AUSTRALIA", "WESTERN"],
    profession: "General Dentist",
    country: "Australia",
    duration: "Counselling-led pathway",
    mode: "Online",
    fees: "Contact counselling team",
    nextBatch: "Open counselling slots",
    excerpt: "Australia dental licensing counselling with documentation and preparation roadmap support.",
    description:
      "Australia dental licensing guidance helps candidates plan eligibility, documentation, exam preparation and professional transition milestones.",
    eligibility: defaultEligibility,
    highlights: defaultHighlights,
    syllabus: defaultSyllabus,
    faqs: COMMON_FAQS,
    featured: false,
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Australian city waterfront representing dental licensing support for Australia"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-haad-lab-tech",
    title: "HAAD Exam for Lab Technician: Complete Eligibility Guide 2024",
    slug: "haad-exam-lab-technician-eligibility-guide",
    excerpt:
      "Understand HAAD eligibility, qualifications, experience expectations and application steps for laboratory technicians targeting Abu Dhabi.",
    content:
      "<h2>Who should take the HAAD lab technician exam?</h2><p>The HAAD pathway is designed for laboratory professionals who want to work in Abu Dhabi healthcare facilities. Candidates should verify qualification, registration and experience rules before applying.</p><h2>Documents to prepare</h2><p>Keep academic certificates, professional registration, experience letters, passport details and good standing documents ready for review and Dataflow processing.</p><h2>How Unique Mentors helps</h2><p>Unique Mentors supports candidates through eligibility review, structured coaching, mock tests, Dataflow guidance and application planning.</p>",
    category: "HAAD",
    tags: ["HAAD", "Lab Technician", "Abu Dhabi", "Eligibility"],
    coverImage: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Lab technician reviewing HAAD exam eligibility documents",
    author: "Unique Mentors Academic Team",
    readTime: 4,
    publishedAt: "2026-05-18",
    featured: true,
    status: "published"
  },
  {
    id: "blog-moh-physio",
    title: "MOH Exam Eligibility for Physiotherapists: Everything You Need to Know",
    slug: "moh-exam-eligibility-criteria-physiotherapists",
    excerpt:
      "A practical guide for physiotherapists checking MOH exam eligibility, documentation and application readiness.",
    content:
      "<h2>MOH eligibility overview</h2><p>Physiotherapists planning UAE careers need to understand qualification, registration and professional experience requirements before beginning the MOH process.</p><h2>Preparation plan</h2><p>A structured plan should include syllabus mapping, clinical case review, timed question practice and documentation milestones.</p><h2>Counselling support</h2><p>Unique Mentors helps candidates identify gaps early and choose a realistic timeline for exam preparation and application submission.</p>",
    category: "MOH",
    tags: ["MOH", "Physiotherapy", "UAE", "Eligibility"],
    coverImage: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Physiotherapist preparing for MOH licensing exam",
    author: "Unique Mentors Academic Team",
    readTime: 5,
    publishedAt: "2026-05-09",
    featured: true,
    status: "published"
  },
  {
    id: "blog-physiohorizon",
    title: "PhysioHorizon 2025 - Powered by Unique Mentors",
    slug: "physiohorizon-2025-powered-by-unique-mentors",
    excerpt:
      "A recap of PhysioHorizon 2025 and how Unique Mentors supports physiotherapy careers beyond borders.",
    content:
      "<h2>Career conversations that matter</h2><p>PhysioHorizon 2025 brought together students, professionals and mentors to discuss global healthcare careers, exam readiness and licensing pathways.</p><h2>Why events help candidates</h2><p>Events create clarity, confidence and peer learning, helping candidates turn overseas ambitions into actionable plans.</p>",
    category: "Events",
    tags: ["Event", "Physiotherapy", "Career"],
    coverImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Healthcare career event hosted for students and professionals",
    author: "Unique Mentors Events Team",
    readTime: 3,
    publishedAt: "2026-04-22",
    featured: false,
    status: "published"
  },
  {
    id: "blog-dha-pharmacist",
    title: "DHA Exam for Pharmacists: Step-by-Step Application Process",
    slug: "dha-exam-pharmacists-application-process",
    excerpt:
      "A clear step-by-step view of DHA pharmacist licensing, Dataflow, exam preparation and application submission.",
    content:
      "<h2>Start with eligibility</h2><p>Pharmacists should first confirm qualification, registration and experience requirements for Dubai Health Authority licensing.</p><h2>Build your preparation plan</h2><p>Combine pharmacology revision, therapeutics, calculations, ethics and mock exams with document readiness.</p><h2>Submit with confidence</h2><p>Unique Mentors helps candidates sequence Dataflow, application submission and exam scheduling without losing momentum.</p>",
    category: "DHA",
    tags: ["DHA", "Pharmacist", "Dubai", "Dataflow"],
    coverImage: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pharmacist preparing documents for DHA licensing application",
    author: "Unique Mentors Licensing Team",
    readTime: 5,
    publishedAt: "2026-04-14",
    featured: false,
    status: "published"
  },
  {
    id: "blog-moh-uae-guide",
    title: "How to Get MOH License in UAE: A Complete Guide for Nurses",
    slug: "how-to-get-moh-license-uae-nurses",
    excerpt:
      "A complete guide for nurses planning MOH licensing in the UAE, from eligibility to exam preparation.",
    content:
      "<h2>Understand the licensing pathway</h2><p>The MOH license pathway includes eligibility review, documentation, Dataflow verification, exam preparation and final application milestones.</p><h2>Common documentation needs</h2><p>Nurses should prepare qualification certificates, registration, experience letters, passport details and good standing documents.</p><h2>How mentoring helps</h2><p>A clear roadmap reduces delays and helps candidates stay focused on the exam while documentation progresses.</p>",
    category: "MOH",
    tags: ["MOH", "Nursing", "UAE", "Guide"],
    coverImage: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Nurse studying for MOH licensing exam in the UAE",
    author: "Unique Mentors Academic Team",
    readTime: 6,
    publishedAt: "2026-03-29",
    featured: false,
    status: "published"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Anjali Menon",
    initials: "AM",
    profession: "Lab Technician",
    examType: "HAAD",
    country: "Abu Dhabi",
    rating: 5,
    review:
      "The mock tests and eligibility guidance helped me stay calm through the HAAD process. The team gave me a clear plan from the first counselling call.",
    featured: true,
    visible: true
  },
  {
    id: "testimonial-2",
    name: "Rahul Varghese",
    initials: "RV",
    profession: "Pharmacist",
    examType: "DHA",
    country: "Dubai",
    rating: 5,
    review:
      "Unique Mentors made the DHA application steps easy to understand. I especially valued the pharmacy-focused practice sessions.",
    featured: true,
    visible: true
  },
  {
    id: "testimonial-3",
    name: "Fathima Nizar",
    initials: "FN",
    profession: "Radiographer",
    examType: "MOH",
    country: "UAE",
    rating: 5,
    review:
      "The faculty explained difficult imaging topics in a practical way. I passed my exam and completed the documentation without confusion.",
    featured: true,
    visible: true
  },
  {
    id: "testimonial-4",
    name: "Sreelakshmi P.",
    initials: "SP",
    profession: "Physiotherapist",
    examType: "MOH",
    country: "UAE",
    rating: 5,
    review:
      "The counselling team helped me choose the right licensing route. Their follow-up and study plan made a huge difference.",
    featured: true,
    visible: true
  },
  {
    id: "testimonial-5",
    name: "Nikhil Thomas",
    initials: "NT",
    profession: "General Dentist",
    examType: "DHA",
    country: "Dubai",
    rating: 5,
    review:
      "The dental exam sessions were structured and exam-oriented. I could identify weak areas early and improve steadily.",
    featured: false,
    visible: true
  },
  {
    id: "testimonial-6",
    name: "Meera Joseph",
    initials: "MJ",
    profession: "Nurse",
    examType: "MOH",
    country: "UAE",
    rating: 5,
    review:
      "From document review to preparation, everything was organized. I felt supported at every stage of the process.",
    featured: false,
    visible: true
  },
  {
    id: "testimonial-7",
    name: "Arun Dev",
    initials: "AD",
    profession: "Microbiologist",
    examType: "HAAD",
    country: "Abu Dhabi",
    rating: 5,
    review:
      "The microbiology revisions and timed tests matched the exam pressure well. My confidence improved after each review session.",
    featured: false,
    visible: true
  },
  {
    id: "testimonial-8",
    name: "Priya Rajan",
    initials: "PR",
    profession: "Healthcare Professional",
    examType: "CORU",
    country: "Ireland",
    rating: 5,
    review:
      "The CORU documentation guidance saved me weeks of uncertainty. The team explained every requirement clearly.",
    featured: false,
    visible: true
  }
];

export const getCourseBySlug = (slug: string) => COURSES.find((course) => course.slug === slug);

export const getBlogBySlug = (slug: string) => BLOG_POSTS.find((post) => post.slug === slug);

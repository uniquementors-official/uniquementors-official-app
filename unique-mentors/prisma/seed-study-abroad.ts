import { ContentStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    title: "Study in the UAE: A Practical Guide for Indian Students",
    slug: "study-in-uae-guide-for-indian-students",
    excerpt:
      "Explore programmes, campus life, costs, and a clear application plan for studying in the UAE from India.",
    country: "UAE",
    service: "Study Abroad Counselling",
    intake: "2027 intakes",
    tags: ["Study in UAE", "Dubai", "Abu Dhabi", "International Students"],
    coverImage: "/images/study-abroad/study-in-uae.jpg",
    metaTitle: "Study in UAE for Indian Students | Unique Mentors",
    metaDesc:
      "A practical guide to studying in the UAE, including course planning, applications, budgets, and student readiness.",
    featured: true,
    readTime: 5,
    content: `
      <h2>Why consider the UAE for your studies?</h2>
      <p>The UAE brings together internationally recognised universities, a multicultural student community, and close connections to India. Cities such as Dubai, Abu Dhabi, Sharjah, and Ajman offer programmes in business, technology, design, healthcare, hospitality, and more. For students who value a globally connected campus while staying close to home, it can be a strong starting point.</p>
      <h2>Build your shortlist around your goal</h2>
      <p>Start with the outcome you want: a degree that supports a career in the Gulf, a transfer pathway, or an international qualification. Compare the curriculum, university recognition, location, tuition, accommodation, internship access, and entry requirements. Healthcare and allied-health students should also check how a qualification fits their intended professional pathway after graduation.</p>
      <h2>Plan the application carefully</h2>
      <p>Keep your academic transcripts, passport, statement of purpose, recommendation letters, and language-test documents organised well before deadlines. Requirements vary by institution and programme, so always confirm the current checklist directly with the university. Apply early enough to leave time for an offer, document review, visa process, and travel planning.</p>
      <h2>Budget beyond tuition</h2>
      <p>Your financial plan should include tuition, visa costs, housing, transport, insurance, books, food, and a sensible emergency reserve. A realistic monthly budget makes it easier to compare campuses and avoid last-minute decisions.</p>
      <h2>How Unique Mentors can help</h2>
      <p>Our counselling team helps you map your interests, academic profile, destination preferences, and timeline into a focused plan. We can support your course shortlist, application readiness, documentation checklist, and pre-departure preparation so you move forward with clarity.</p>
      <p><strong>Important:</strong> Admission and visa rules can change. Confirm the latest requirements with your chosen institution and official UAE authorities before submitting an application.</p>
    `,
  },
  {
    title: "Study in Canada: Planning Your Course, Budget, and Next Steps",
    slug: "study-in-canada-course-budget-guide",
    excerpt:
      "A student-first guide to choosing a Canadian programme, preparing documents, and planning a confident application.",
    country: "Canada",
    service: "Study Abroad Counselling",
    intake: "2027 intakes",
    tags: ["Study in Canada", "Canada Admissions", "International Education", "Student Planning"],
    coverImage: "/images/study-abroad/study-in-canada.jpg",
    metaTitle: "Study in Canada Guide for Indian Students | Unique Mentors",
    metaDesc:
      "Plan your Canadian study pathway with guidance on course selection, budgeting, documentation, and applications.",
    featured: true,
    readTime: 6,
    content: `
      <h2>Start with the right study pathway</h2>
      <p>Canada offers a broad mix of universities, colleges, applied programmes, and research-led options. The right choice depends on your academic background, preferred learning style, budget, city preference, and career direction. A course name alone is not enough: review subjects, practical learning opportunities, assessment style, and the support available to international students.</p>
      <h2>Choose a destination with your lifestyle in mind</h2>
      <p>Large cities, smaller communities, and campus towns each create a different student experience. Consider climate, accommodation availability, local transport, daily expenses, part-time work conditions, and access to community support. Give yourself time to understand what living independently in a new environment may feel like.</p>
      <h2>Prepare a complete application file</h2>
      <p>Most applications ask for academic records, a passport, supporting statements, and evidence of language proficiency where required. Some programmes may ask for a portfolio, interview, or additional subject prerequisites. Keep every document clear, current, and consistent. Avoid waiting until the final week, especially when official transcripts or test scores are needed.</p>
      <h2>Make a realistic financial plan</h2>
      <p>Plan for tuition, housing, health insurance, local travel, study materials, food, and personal costs. Check official university cost estimates and keep a buffer for price changes. Scholarship options may be available, but they should be part of a wider plan rather than the only source of funding.</p>
      <h2>Prepare for arrival, not just admission</h2>
      <p>Before you leave, create a checklist for housing, travel, banking, insurance, campus orientation, and emergency contacts. For healthcare-focused students, it is useful to keep a long-term view of professional recognition and any future licensing requirements.</p>
      <p><strong>Important:</strong> Always verify current study-permit, work, and post-study rules on official Canadian government and university websites.</p>
    `,
  },
  {
    title: "Study in Australia: Finding the Right International Education Pathway",
    slug: "study-in-australia-international-education-pathway",
    excerpt:
      "Understand how to evaluate Australian courses, campuses, costs, and application readiness before you apply.",
    country: "Australia",
    service: "Study Abroad Counselling",
    intake: "2027 intakes",
    tags: ["Study in Australia", "Australian Universities", "International Students", "Course Selection"],
    coverImage: "/images/study-abroad/study-in-australia.jpg",
    metaTitle: "Study in Australia for Indian Students | Unique Mentors",
    metaDesc:
      "Plan your Australia study journey with practical guidance on courses, applications, budgets, and student readiness.",
    featured: false,
    readTime: 5,
    content: `
      <h2>Think beyond the destination</h2>
      <p>Australia is known for its diverse study options, research environment, and welcoming campus communities. The best decision, however, begins with your own academic and career goals. Decide whether you are looking for an undergraduate degree, postgraduate study, a professional programme, or a pathway that builds specific skills.</p>
      <h2>Compare the course, campus, and city together</h2>
      <p>Read the programme structure closely. Look for core subjects, elective choices, placements, facilities, teaching methods, and graduate outcomes. Then compare the city or region: housing costs, weather, community, travel, and access to practical opportunities all affect your daily experience.</p>
      <h2>Know your application timeline</h2>
      <p>A strong application takes preparation. Collect academic records, passport details, English-language results where required, and any supporting material the university requests. Build in time for university decisions, financial arrangements, health cover, visa processing, and travel. A well-planned timeline lowers stress and gives you better choices.</p>
      <h2>Budget with confidence</h2>
      <p>Estimate the full picture, including tuition, accommodation, utilities, local transport, food, insurance, course materials, and personal spending. Use official institution figures as your starting point and maintain an emergency reserve.</p>
      <h2>Stay career-aware</h2>
      <p>If your future goal includes healthcare or allied-health practice, discuss your long-term pathway early. Course accreditation, professional registration, placements, and language requirements may all matter after graduation. Unique Mentors can help you connect today's study decision to your future international career plan.</p>
      <p><strong>Important:</strong> Check the current requirements on official Australian Government and university websites before making decisions.</p>
    `,
  },
  {
    title: "Study in Ireland: A Clear Guide for International Students",
    slug: "study-in-ireland-guide-for-international-students",
    excerpt:
      "Learn how to shortlist Irish programmes, organise your application, and plan a smooth student transition.",
    country: "Ireland",
    service: "Study Abroad Counselling",
    intake: "2027 intakes",
    tags: ["Study in Ireland", "Ireland Admissions", "International Students", "Healthcare Careers"],
    coverImage: "/images/study-abroad/study-in-ireland.jpg",
    metaTitle: "Study in Ireland for Indian Students | Unique Mentors",
    metaDesc:
      "Explore Irish study options with a practical guide to course shortlisting, documents, budgeting, and readiness.",
    featured: false,
    readTime: 5,
    content: `
      <h2>Why Ireland deserves a closer look</h2>
      <p>Ireland offers an English-speaking academic environment, internationally connected universities, and a lively student culture. It can appeal to students looking for focused programmes in areas such as technology, business, life sciences, healthcare-related fields, and creative disciplines.</p>
      <h2>Shortlist programmes with purpose</h2>
      <p>Start by listing your interests and career direction, then compare each programme's modules, entry requirements, duration, teaching style, and campus location. For professionally regulated fields, do not assume that every qualification leads to the same outcome. Take time to understand how the course supports your individual goal.</p>
      <h2>Get documents ready early</h2>
      <p>Your application may need academic transcripts, a passport, a personal statement, references, and proof of English language ability. Some courses may request extra evidence such as a CV, portfolio, or interview. Keep names, dates, and qualifications consistent across every document.</p>
      <h2>Plan your student life</h2>
      <p>A complete plan includes more than receiving an offer. Research housing options, estimated living costs, transport, health insurance, and the support services available through your university. Discuss your move with family and prepare for the practical adjustments of a new country and learning environment.</p>
      <h2>Turn your goal into a timeline</h2>
      <p>Unique Mentors can help you structure a destination plan around your profile, intake target, documentation, course shortlist, and pre-departure actions. For students with healthcare ambitions, we can also help you keep future professional pathways in view.</p>
      <p><strong>Important:</strong> Confirm the latest entry and immigration information through official Irish authorities and your chosen university.</p>
    `,
  },
  {
    title: "Study in Germany: How to Build a Smart Application Plan",
    slug: "study-in-germany-smart-application-plan",
    excerpt:
      "A practical starting point for students exploring German universities, programme fit, language, and preparation.",
    country: "Germany",
    service: "Study Abroad Counselling",
    intake: "2027 intakes",
    tags: ["Study in Germany", "German Universities", "International Students", "Application Planning"],
    coverImage: "/images/study-abroad/study-in-germany.jpg",
    metaTitle: "Study in Germany Guide for Indian Students | Unique Mentors",
    metaDesc:
      "A practical guide to planning a Germany study application, from programme research to language and document readiness.",
    featured: false,
    readTime: 6,
    content: `
      <h2>Research the programme before the price</h2>
      <p>Germany is often explored for its academic reputation and range of public and private institutions. Begin with the programme itself: review the curriculum, delivery language, required prior learning, academic calendar, city, and the support offered to international students. A low-fee option is only valuable when it genuinely fits your education and career plan.</p>
      <h2>Understand language expectations</h2>
      <p>Programmes may be taught in English, German, or a combination of both. Check the language standard stated by the university and plan enough preparation time for the required test or certificate. Beyond admission, local language skills can make daily life, community integration, and practical opportunities easier.</p>
      <h2>Organise documents carefully</h2>
      <p>Academic transcripts, certificates, passport information, language evidence, CV, and motivation materials should be accurate and ready well before the deadline. Depending on your background and course choice, additional verification or preparatory steps may apply. Work from the official checklist for each university rather than a general list found online.</p>
      <h2>Plan the transition</h2>
      <p>Include housing, health insurance, proof-of-funds requirements, local transport, and arrival arrangements in your timeline. Start researching early because accommodation can take time to arrange in popular student cities.</p>
      <h2>Get a profile-based strategy</h2>
      <p>Unique Mentors can help you turn your academic profile and interests into a focused destination strategy. We support course exploration, document readiness, and practical pre-departure planning while helping you keep your future career aspirations clear.</p>
      <p><strong>Important:</strong> University and immigration requirements change. Verify current details directly through official German authorities and institutions.</p>
    `,
  },
  {
    title: "Study in the UK: Choosing a Course That Moves You Forward",
    slug: "study-in-uk-choosing-the-right-course",
    excerpt:
      "Plan a focused UK study application with course comparison, documentation, budgeting, and student-readiness tips.",
    country: "United Kingdom",
    service: "Study Abroad Counselling",
    intake: "2027 intakes",
    tags: ["Study in UK", "UK Universities", "International Students", "Course Planning"],
    coverImage: "/images/study-abroad/study-in-uk.jpg",
    metaTitle: "Study in the UK for Indian Students | Unique Mentors",
    metaDesc:
      "Learn how to choose a UK course, organise your application, budget for student life, and prepare for departure.",
    featured: false,
    readTime: 5,
    content: `
      <h2>Make the UK course choice personal</h2>
      <p>The UK offers a wide range of undergraduate and postgraduate study options, but the strongest application begins with a clear personal fit. Think about your academic strengths, preferred subjects, future career, course duration, campus environment, and the type of support you want as an international student.</p>
      <h2>Compare what you will actually study</h2>
      <p>Do not choose only by university name. Read the module list, teaching format, assessments, practical components, facilities, and progression options. Review the programme's entry requirements carefully and make sure your prior qualifications match the expected level.</p>
      <h2>Prepare an application that is consistent</h2>
      <p>Gather academic records, passport details, references, and your personal statement or supporting material well ahead of the deadline. Where language proficiency evidence is required, schedule your test with enough time for a retake if needed. A clear, truthful, and well-organised application is always stronger than a rushed one.</p>
      <h2>Build a sensible financial plan</h2>
      <p>Include tuition, accommodation, living costs, local transport, health-related charges, books, and personal expenses. Costs vary significantly between cities, so use your selected university's official estimates instead of relying on broad averages.</p>
      <h2>Prepare for a confident start</h2>
      <p>Once you receive an offer, organise your next actions around official guidance, accommodation, travel, insurance, and university orientation. Unique Mentors can help you create a step-by-step plan that keeps your study aim, documents, and readiness on track.</p>
      <p><strong>Important:</strong> Confirm the latest course, visa, and financial requirements with official UK authorities and your chosen university.</p>
    `,
  },
];

async function main() {
  for (const post of posts) {
    await prisma.studyAbroad.upsert({
      where: { slug: post.slug },
      update: {
        ...post,
        status: ContentStatus.PUBLISHED,
        author: "Unique Mentors Study Abroad Team",
        publishedAt: new Date("2026-10-21T09:00:00.000Z"),
      },
      create: {
        ...post,
        status: ContentStatus.PUBLISHED,
        author: "Unique Mentors Study Abroad Team",
        publishedAt: new Date("2026-10-21T09:00:00.000Z"),
      },
    });
  }

  console.log(`Published ${posts.length} Study Abroad posts.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

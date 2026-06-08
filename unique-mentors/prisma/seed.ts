import bcrypt from "bcryptjs";
import { prisma } from "../lib/db";
import { SITE_CONFIG } from "../lib/constants";
import { BLOG_POSTS, COURSES, TESTIMONIALS } from "../lib/content";
import { calculateReadTime, slugify } from "../lib/utils";

async function main() {
  const passwordHash = await bcrypt.hash("Admin@2024!", 12);

  await prisma.user.upsert({
    where: { email: "admin@uniquementors.com" },
    update: {
      name: "Unique Mentors Admin",
      passwordHash,
      role: "ADMIN"
    },
    create: {
      email: "admin@uniquementors.com",
      name: "Unique Mentors Admin",
      passwordHash,
      role: "ADMIN"
    }
  });

  const settings = await prisma.siteSettings.findFirst();
  if (settings) {
    await prisma.siteSettings.update({
      where: { id: settings.id },
      data: {
        siteName: SITE_CONFIG.name,
        tagline: SITE_CONFIG.tagline,
        description: SITE_CONFIG.description,
        phone: SITE_CONFIG.phone,
        whatsapp: SITE_CONFIG.whatsapp,
        email: SITE_CONFIG.email,
        address: SITE_CONFIG.address,
        socialLinks: SITE_CONFIG.social
      }
    });
  } else {
    await prisma.siteSettings.create({
      data: {
        siteName: SITE_CONFIG.name,
        tagline: SITE_CONFIG.tagline,
        description: SITE_CONFIG.description,
        phone: SITE_CONFIG.phone,
        whatsapp: SITE_CONFIG.whatsapp,
        email: SITE_CONFIG.email,
        address: SITE_CONFIG.address,
        socialLinks: SITE_CONFIG.social,
        announcement: "Free counselling slots open for MOH, DHA and HAAD candidates.",
        announcementOn: true
      }
    });
  }

  for (const course of COURSES) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        examType: course.examType,
        examTypes: course.examTypes,
        profession: course.profession,
        country: course.country,
        duration: course.duration,
        mode: course.mode,
        fees: course.fees,
        nextBatch: course.nextBatch,
        shortDescription: course.excerpt,
        description: course.description,
        eligibility: course.eligibility,
        highlights: course.highlights,
        syllabus: course.syllabus.join("\n"),
        faqs: course.faqs,
        coverImage: course.coverImage,
        status: "PUBLISHED",
        featured: course.featured
      },
      create: {
        title: course.title,
        slug: course.slug,
        examType: course.examType,
        examTypes: course.examTypes,
        profession: course.profession,
        country: course.country,
        duration: course.duration,
        mode: course.mode,
        fees: course.fees,
        nextBatch: course.nextBatch,
        shortDescription: course.excerpt,
        description: course.description,
        eligibility: course.eligibility,
        highlights: course.highlights,
        syllabus: course.syllabus.join("\n"),
        faqs: course.faqs,
        coverImage: course.coverImage,
        status: "PUBLISHED",
        featured: course.featured
      }
    });
  }

  for (const post of BLOG_POSTS) {
    await prisma.blog.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        coverImage: post.coverImage,
        status: "PUBLISHED",
        featured: post.featured,
        author: post.author,
        readTime: post.readTime || calculateReadTime(post.content),
        publishedAt: new Date(post.publishedAt)
      },
      create: {
        title: post.title,
        slug: post.slug || slugify(post.title),
        content: post.content,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        coverImage: post.coverImage,
        status: "PUBLISHED",
        featured: post.featured,
        author: post.author,
        readTime: post.readTime || calculateReadTime(post.content),
        publishedAt: new Date(post.publishedAt)
      }
    });
  }

  for (const testimonial of TESTIMONIALS) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: testimonial.name, examType: testimonial.examType }
    });

    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: {
          profession: testimonial.profession,
          country: testimonial.country,
          rating: testimonial.rating,
          review: testimonial.review,
          visible: testimonial.visible,
          featured: testimonial.featured
        }
      });
    } else {
      await prisma.testimonial.create({
        data: {
          name: testimonial.name,
          profession: testimonial.profession,
          examType: testimonial.examType,
          country: testimonial.country,
          rating: testimonial.rating,
          review: testimonial.review,
          visible: testimonial.visible,
          featured: testimonial.featured
        }
      });
    }
  }

  const sampleLeads = [
    ["Asha Kumar", "asha@example.com", "+919876543210", "Lab Technician", "HAAD", "APPLY", "NEW"],
    ["Vivek Nair", "vivek@example.com", "+919812345678", "Pharmacist", "DHA", "CONTACT", "CONTACTED"],
    ["Nimisha Thomas", "nimisha@example.com", "+919909090909", "Radiographer", "MOH", "APPLY", "ENROLLED"],
    ["Jacob Mathew", "jacob@example.com", "+919777777777", "General Dentist", "DHA", "CONTACT", "NEW"],
    ["Rekha Prasad", "rekha@example.com", "+919666666666", "Nurse", "MOH", "WHATSAPP", "CLOSED"],
    ["Farhan Ali", "farhan@example.com", "+919555555555", "Microbiologist", "HAAD", "APPLY", "CONTACTED"],
    ["Devika S.", "devika@example.com", "+919444444444", "Physiotherapist", "MOH", "CONTACT", "NEW"],
    ["Manu George", "manu@example.com", "+919333333333", "General Practitioner", "HAAD", "APPLY", "ENROLLED"],
    ["Sara John", "sara@example.com", "+919222222222", "Lab Technician", "DHA", "MANUAL", "CONTACTED"],
    ["Arjun R.", "arjun@example.com", "+919111111111", "Healthcare Professional", "CORU", "CONTACT", "NEW"]
  ] as const;

  for (const [name, email, phone, profession, examType, source, status] of sampleLeads) {
    const existing = await prisma.lead.findFirst({ where: { email, examType } });
    if (!existing) {
      await prisma.lead.create({
        data: {
          name,
          email,
          phone,
          profession,
          examType,
          source,
          status,
          message: `Seed enquiry for ${examType} counselling`
        }
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

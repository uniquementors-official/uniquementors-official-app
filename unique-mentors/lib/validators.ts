import { z } from "zod";

const indianPhone = z
  .string()
  .trim()
  .min(10, "Enter a valid phone number")
  .regex(/^(\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid Indian phone number");

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: indianPhone,
  profession: z.string().trim().max(80).optional().or(z.literal("")),
  examType: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(1200).optional().or(z.literal(""))
});

export const applicationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: indianPhone,
  location: z.string().trim().min(2).max(120),
  profession: z.string().trim().min(2).max(80),
  experience: z.string().trim().min(1).max(40),
  examType: z.string().trim().min(2).max(40),
  targetCountry: z.string().trim().min(2).max(80),
  message: z.string().trim().max(1200).optional().or(z.literal(""))
});

export const newsletterSchema = z.object({
  email: z.string().trim().email()
});

export const newsletterCampaignSchema = z.object({
  subject: z.string().trim().min(4).max(140),
  content: z.string().trim().min(10).max(5000)
});

export const blogSchema = z.object({
  title: z.string().trim().min(4).max(140),
  slug: z.string().trim().max(160).optional(),
  content: z.string().min(20),
  excerpt: z.string().trim().max(300).optional(),
  category: z.string().trim().min(2).max(60),
  tags: z.array(z.string().trim().min(1)).default([]),
  coverImage: z.string().url().optional().or(z.literal("")),
  metaTitle: z.string().trim().max(70).optional().or(z.literal("")),
  metaDesc: z.string().trim().max(170).optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  publishedAt: z.string().datetime().optional()
});

export const courseSchema = z.object({
  title: z.string().trim().min(4).max(140),
  slug: z.string().trim().max(160).optional(),
  examType: z.string().trim().min(2).max(40),
  profession: z.string().trim().min(2).max(80),
  country: z.string().trim().min(2).max(80),
  duration: z.string().trim().min(2).max(80),
  fees: z.string().trim().max(80).optional().or(z.literal("")),
  mode: z.enum(["Online", "Offline", "Hybrid"]).default("Hybrid"),
  shortDescription: z.string().trim().min(10).max(300),
  description: z.string().min(20),
  eligibility: z.array(z.string().trim().min(1)).default([]),
  highlights: z.array(z.string().trim().min(1)).default([]),
  syllabus: z.string().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  coverImage: z.string().url().optional().or(z.literal(""))
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(2).max(80),
  profession: z.string().trim().min(2).max(80),
  examType: z.string().trim().min(2).max(40),
  country: z.string().trim().min(2).max(80),
  rating: z.number().int().min(1).max(5),
  review: z.string().trim().min(20).max(600),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  visible: z.boolean().default(true),
  featured: z.boolean().default(false)
});

export const leadUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "ENROLLED", "CLOSED"]).optional(),
  notes: z.string().trim().max(2000).optional()
});

export const eventSchema = z.object({
  title: z.string().trim().min(4).max(140),
  slug: z.string().trim().max(160).optional(),
  content: z.string().min(20),
  excerpt: z.string().trim().max(300).optional(),
  eventDate: z.string(),
  location: z.string().trim().min(2).max(140).default("Unique Mentors Kochi"),
  coverImage: z.string().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT")
});

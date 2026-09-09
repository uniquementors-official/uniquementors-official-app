import re

with open("lib/life-content.ts", "r") as f:
    content = f.read()

# We need to completely rewrite getInstructors, getGalleryItems, etc to use prisma.
# Actually, since ensureLifeContent is crashing on Vercel, we can just remove ensureLifeContent calls and rewrite the functions.

new_content = """import { prisma } from "@/lib/db";
import { randomUUID } from "crypto";

type Status = "DRAFT" | "PUBLISHED";

export interface GalleryItemInput {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  sortOrder?: number;
  status?: Status;
}

export interface InstructorInput {
  name: string;
  slug?: string;
  designation?: string;
  bio?: string;
  image?: string;
  imageAlt?: string;
  sortOrder?: number;
  status?: Status;
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function cleanStatus(status?: Status): "DRAFT" | "PUBLISHED" {
  return status === "DRAFT" ? "DRAFT" : "PUBLISHED";
}

function cleanOrder(value?: number) {
  return Number.isFinite(value) ? Number(value) : 0;
}

// Ensure defaults are seeded if tables are empty
async function ensureSeed() {
  const count = await prisma.instructor.count();
  if (count === 0) {
    // We don't seed here anymore to avoid runtime Vercel crashes. 
    // They should be managed via admin panel.
  }
}

export async function getGalleryItems({ includeDrafts = false }: { includeDrafts?: boolean } = {}) {
  return prisma.galleryItem.findMany({
    where: includeDrafts ? undefined : { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  });
}

export async function getGalleryItemById(id: string) {
  return prisma.galleryItem.findUnique({ where: { id } });
}

export async function createGalleryItem(data: GalleryItemInput) {
  return prisma.galleryItem.create({
    data: {
      title: data.title,
      description: data.description,
      image: data.image,
      imageAlt: data.imageAlt || null,
      sortOrder: cleanOrder(data.sortOrder),
      status: cleanStatus(data.status),
    }
  });
}

export async function updateGalleryItem(id: string, data: GalleryItemInput) {
  return prisma.galleryItem.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      image: data.image,
      imageAlt: data.imageAlt || null,
      sortOrder: cleanOrder(data.sortOrder),
      status: cleanStatus(data.status),
    }
  });
}

export async function deleteGalleryItem(id: string) {
  return prisma.galleryItem.delete({ where: { id } });
}

export async function getInstructors({ includeDrafts = false }: { includeDrafts?: boolean } = {}) {
  return prisma.instructor.findMany({
    where: includeDrafts ? undefined : { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
  });
}

export async function getInstructorById(id: string) {
  return prisma.instructor.findUnique({ where: { id } });
}

export async function createInstructor(data: InstructorInput) {
  const slug = data.slug?.trim() || slugify(data.name);
  return prisma.instructor.create({
    data: {
      name: data.name,
      slug,
      designation: data.designation || null,
      bio: data.bio || null,
      image: data.image || null,
      imageAlt: data.imageAlt || null,
      sortOrder: cleanOrder(data.sortOrder),
      status: cleanStatus(data.status),
    }
  });
}

export async function updateInstructor(id: string, data: InstructorInput) {
  const slug = data.slug?.trim() || slugify(data.name);
  return prisma.instructor.update({
    where: { id },
    data: {
      name: data.name,
      slug,
      designation: data.designation || null,
      bio: data.bio || null,
      image: data.image || null,
      imageAlt: data.imageAlt || null,
      sortOrder: cleanOrder(data.sortOrder),
      status: cleanStatus(data.status),
    }
  });
}

export async function deleteInstructor(id: string) {
  return prisma.instructor.delete({ where: { id } });
}
"""

with open("lib/life-content.ts", "w") as f:
    f.write(new_content)


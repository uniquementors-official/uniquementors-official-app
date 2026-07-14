import { randomUUID } from "crypto";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import type { GalleryItem, Instructor } from "@/types";

type Status = "DRAFT" | "PUBLISHED";

type GalleryItemInput = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string | null;
  sortOrder?: number;
  status?: Status;
};

type InstructorInput = {
  name: string;
  slug?: string;
  designation?: string | null;
  bio?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  sortOrder?: number;
  status?: Status;
};

const DEFAULT_GALLERY_ITEMS: Array<GalleryItem & { createdAt?: never; updatedAt?: never }> = [
  {
    id: "life-unique-mentors-team",
    title: "Life @ Unique Mentors",
    description: "Real moments with the team behind our student guidance, mentoring and career support.",
    image: "/images/team/team.png",
    imageAlt: "Unique Mentors team gathered together",
    sortOrder: 1,
    status: "PUBLISHED"
  },
  {
    id: "life-counselling-moments",
    title: "Counselling Moments",
    description: "One-to-one guidance sessions that help candidates understand the right licensing pathway.",
    image: "/images/herocarousel/image%20copy%2019.png",
    imageAlt: "Healthcare counselling moment at Unique Mentors",
    sortOrder: 2,
    status: "PUBLISHED"
  },
  {
    id: "life-training-support",
    title: "Training & Support",
    description: "Focused academic support, documentation help and exam preparation under one roof.",
    image: "/images/herocarousel/image%20copy%2018.png",
    imageAlt: "Young doctor representing Unique Mentors training support",
    sortOrder: 3,
    status: "PUBLISHED"
  }
];

const DEFAULT_INSTRUCTORS: Array<Instructor & { createdAt?: never; updatedAt?: never }> = [
  {
    id: "instructor-mini-s-thomas",
    name: "Mini S. Thomas",
    slug: "mini-s-thomas",
    designation: "Senior Instructor",
    bio: "Guides students through structured preparation, communication and career-readiness support.",
    image: "/images/founders/Dr.%20Deepa%20Seira%20Babu.png",
    imageAlt: "Mini S. Thomas instructor profile",
    sortOrder: 1,
    status: "PUBLISHED"
  },
  {
    id: "instructor-reshma-swaminathan",
    name: "Reshma Swaminathan",
    slug: "reshma-swaminathan",
    designation: "Instructor",
    bio: "Supports candidates with academic planning, documentation clarity and interview preparation.",
    image: "/images/founders/Dr.%20Praveena%20Prathapachandran.png",
    imageAlt: "Reshma Swaminathan instructor profile",
    sortOrder: 2,
    status: "PUBLISHED"
  },
  {
    id: "instructor-dr-kavitha-r-nair",
    name: "DR. Kavitha R Nair",
    slug: "dr-kavitha-r-nair",
    designation: "Academic Mentor",
    bio: "Mentors healthcare professionals with exam strategy, licensing orientation and practical guidance.",
    image: "/images/team/Ms.%20Kavitha%20R%20Nair.png",
    imageAlt: "DR. Kavitha R Nair instructor profile",
    sortOrder: 3,
    status: "PUBLISHED"
  },
  {
    id: "instructor-sony-george",
    name: "Sony George",
    slug: "sony-george",
    designation: "Instructor",
    bio: "Helps students stay aligned through course planning, eligibility review and candidate support.",
    image: null,
    imageAlt: "Sony George instructor profile",
    sortOrder: 4,
    status: "PUBLISHED"
  }
];

let setupPromise: Promise<void> | null = null;

function cleanStatus(status?: Status): Status {
  return status === "DRAFT" ? "DRAFT" : "PUBLISHED";
}

function cleanOrder(value?: number) {
  return Number.isFinite(value) ? Number(value) : 0;
}

async function ensureTables() {
  await prisma.$executeRawUnsafe(`
    DO $$
    BEGIN
      CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "GalleryItem" (
      "id" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "image" TEXT NOT NULL,
      "imageAlt" TEXT,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Instructor" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "designation" TEXT,
      "bio" TEXT,
      "image" TEXT,
      "imageAlt" TEXT,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Instructor_slug_key" ON "Instructor"("slug");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "GalleryItem_status_sortOrder_idx" ON "GalleryItem"("status", "sortOrder");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Instructor_status_sortOrder_idx" ON "Instructor"("status", "sortOrder");`);
}

async function seedDefaults() {
  for (const item of DEFAULT_GALLERY_ITEMS) {
    await prisma.$executeRaw`
      INSERT INTO "GalleryItem" ("id", "title", "description", "image", "imageAlt", "sortOrder", "status", "createdAt", "updatedAt")
      VALUES (${item.id}, ${item.title}, ${item.description}, ${item.image}, ${item.imageAlt ?? null}, ${item.sortOrder}, ${item.status}::"ContentStatus", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT ("id") DO NOTHING
    `;
  }

  for (const instructor of DEFAULT_INSTRUCTORS) {
    await prisma.$executeRaw`
      INSERT INTO "Instructor" ("id", "name", "slug", "designation", "bio", "image", "imageAlt", "sortOrder", "status", "createdAt", "updatedAt")
      VALUES (${instructor.id}, ${instructor.name}, ${instructor.slug}, ${instructor.designation ?? null}, ${instructor.bio ?? null}, ${instructor.image ?? null}, ${instructor.imageAlt ?? null}, ${instructor.sortOrder}, ${instructor.status}::"ContentStatus", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT ("id") DO NOTHING
    `;
  }
}

export async function ensureLifeContent() {
  setupPromise ??= (async () => {
    await ensureTables();
    await seedDefaults();
  })();

  await setupPromise;
}

export async function getGalleryItems({ includeDrafts = false }: { includeDrafts?: boolean } = {}) {
  await ensureLifeContent();
  if (includeDrafts) {
    return prisma.$queryRaw<GalleryItem[]>`
      SELECT "id", "title", "description", "image", "imageAlt", "sortOrder", "status", "createdAt", "updatedAt"
      FROM "GalleryItem"
      ORDER BY "sortOrder" ASC, "createdAt" DESC
    `;
  }

  return prisma.$queryRaw<GalleryItem[]>`
    SELECT "id", "title", "description", "image", "imageAlt", "sortOrder", "status", "createdAt", "updatedAt"
    FROM "GalleryItem"
    WHERE "status" = 'PUBLISHED'
    ORDER BY "sortOrder" ASC, "createdAt" DESC
  `;
}

export async function getGalleryItemById(id: string) {
  await ensureLifeContent();
  const items = await prisma.$queryRaw<GalleryItem[]>`
    SELECT "id", "title", "description", "image", "imageAlt", "sortOrder", "status", "createdAt", "updatedAt"
    FROM "GalleryItem"
    WHERE "id" = ${id}
    LIMIT 1
  `;
  return items[0] ?? null;
}

export async function createGalleryItem(data: GalleryItemInput) {
  await ensureLifeContent();
  const id = randomUUID();
  const status = cleanStatus(data.status);
  await prisma.$executeRaw`
    INSERT INTO "GalleryItem" ("id", "title", "description", "image", "imageAlt", "sortOrder", "status", "createdAt", "updatedAt")
    VALUES (${id}, ${data.title}, ${data.description}, ${data.image}, ${data.imageAlt || null}, ${cleanOrder(data.sortOrder)}, ${status}::"ContentStatus", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;
  return getGalleryItemById(id);
}

export async function updateGalleryItem(id: string, data: GalleryItemInput) {
  await ensureLifeContent();
  const status = cleanStatus(data.status);
  await prisma.$executeRaw`
    UPDATE "GalleryItem"
    SET "title" = ${data.title},
        "description" = ${data.description},
        "image" = ${data.image},
        "imageAlt" = ${data.imageAlt || null},
        "sortOrder" = ${cleanOrder(data.sortOrder)},
        "status" = ${status}::"ContentStatus",
        "updatedAt" = CURRENT_TIMESTAMP
    WHERE "id" = ${id}
  `;
  return getGalleryItemById(id);
}

export async function deleteGalleryItem(id: string) {
  await ensureLifeContent();
  await prisma.$executeRaw`DELETE FROM "GalleryItem" WHERE "id" = ${id}`;
}

export async function getInstructors({ includeDrafts = false }: { includeDrafts?: boolean } = {}) {
  await ensureLifeContent();
  if (includeDrafts) {
    return prisma.$queryRaw<Instructor[]>`
      SELECT "id", "name", "slug", "designation", "bio", "image", "imageAlt", "sortOrder", "status", "createdAt", "updatedAt"
      FROM "Instructor"
      ORDER BY "sortOrder" ASC, "name" ASC
    `;
  }

  return prisma.$queryRaw<Instructor[]>`
    SELECT "id", "name", "slug", "designation", "bio", "image", "imageAlt", "sortOrder", "status", "createdAt", "updatedAt"
    FROM "Instructor"
    WHERE "status" = 'PUBLISHED'
    ORDER BY "sortOrder" ASC, "name" ASC
  `;
}

export async function getInstructorById(id: string) {
  await ensureLifeContent();
  const items = await prisma.$queryRaw<Instructor[]>`
    SELECT "id", "name", "slug", "designation", "bio", "image", "imageAlt", "sortOrder", "status", "createdAt", "updatedAt"
    FROM "Instructor"
    WHERE "id" = ${id}
    LIMIT 1
  `;
  return items[0] ?? null;
}

export async function createInstructor(data: InstructorInput) {
  await ensureLifeContent();
  const id = randomUUID();
  const status = cleanStatus(data.status);
  const slug = data.slug?.trim() || slugify(data.name);
  await prisma.$executeRaw`
    INSERT INTO "Instructor" ("id", "name", "slug", "designation", "bio", "image", "imageAlt", "sortOrder", "status", "createdAt", "updatedAt")
    VALUES (${id}, ${data.name}, ${slug}, ${data.designation || null}, ${data.bio || null}, ${data.image || null}, ${data.imageAlt || null}, ${cleanOrder(data.sortOrder)}, ${status}::"ContentStatus", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;
  return getInstructorById(id);
}

export async function updateInstructor(id: string, data: InstructorInput) {
  await ensureLifeContent();
  const status = cleanStatus(data.status);
  const slug = data.slug?.trim() || slugify(data.name);
  await prisma.$executeRaw`
    UPDATE "Instructor"
    SET "name" = ${data.name},
        "slug" = ${slug},
        "designation" = ${data.designation || null},
        "bio" = ${data.bio || null},
        "image" = ${data.image || null},
        "imageAlt" = ${data.imageAlt || null},
        "sortOrder" = ${cleanOrder(data.sortOrder)},
        "status" = ${status}::"ContentStatus",
        "updatedAt" = CURRENT_TIMESTAMP
    WHERE "id" = ${id}
  `;
  return getInstructorById(id);
}

export async function deleteInstructor(id: string) {
  await ensureLifeContent();
  await prisma.$executeRaw`DELETE FROM "Instructor" WHERE "id" = ${id}`;
}

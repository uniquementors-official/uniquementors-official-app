import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

function parseDateStr(str) {
  if (!str) return new Date();
  const d = new Date(str);
  if (!isNaN(d.getTime())) return d;
  
  // Try DD-MM-YYYY
  const parts = str.split("-");
  if (parts.length === 3) {
      const d2 = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      if (!isNaN(d2.getTime())) return d2;
  }
  return new Date();
}

async function main() {
  const jsonPath = "/Users/harishs/Library/Mobile Documents/com~apple~CloudDocs/Desktop/uniquementors.com/unique-mentors/uniquementors_website_uniquementors.json";
  const assetsUploads = "/Users/harishs/Library/Mobile Documents/com~apple~CloudDocs/Desktop/uniquementors.com/unique-mentors/assets/uploads";
  const articlesUploads = path.join(process.cwd(), "public", "uploads", "articles");
  const eventsUploads = path.join(process.cwd(), "public", "uploads", "events");

  if (!fs.existsSync(articlesUploads)) fs.mkdirSync(articlesUploads, { recursive: true });
  if (!fs.existsSync(eventsUploads)) fs.mkdirSync(eventsUploads, { recursive: true });

  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const data = JSON.parse(rawData);

  let tblPostData = [];
  let tblEventsData = [];

  for (const item of data) {
    if (item.type === "table" && item.name === "tbl_post") tblPostData = item.data;
    if (item.type === "table" && item.name === "tbl_events") tblEventsData = item.data;
  }

  const existingArticles = await prisma.article.findMany({ select: { slug: true } });
  const articleSlugs = new Set(existingArticles.map(a => a.slug));

  const existingEvents = await prisma.event.findMany({ select: { slug: true } });
  const eventSlugs = new Set(existingEvents.map(e => e.slug));

  const newArticles = [];
  for (const post of tblPostData) {
    if (articleSlugs.has(post.post_slug)) continue;

    let coverImage = null;
    if (post.photo) {
      const srcPath = path.join(assetsUploads, post.photo);
      const destPath = path.join(articlesUploads, post.photo);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        coverImage = `/uploads/articles/${post.photo}`;
      }
    }
    newArticles.push({
      title: post.post_title,
      slug: post.post_slug,
      content: post.post_content || "",
      excerpt: (post.post_content || "").substring(0, 150),
      category: "General",
      coverImage,
      status: "PUBLISHED",
      publishedAt: parseDateStr(post.post_date)
    });
  }

  const newEvents = [];
  for (const event of tblEventsData) {
    if (eventSlugs.has(event.event_slug)) continue;

    let coverImage = null;
    if (event.photo) {
      const srcPath = path.join(assetsUploads, event.photo);
      const destPath = path.join(eventsUploads, event.photo);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        coverImage = `/uploads/events/${event.photo}`;
      }
    }
    newEvents.push({
      title: event.event_title,
      slug: event.event_slug,
      content: event.event_content || "",
      excerpt: (event.event_content || "").substring(0, 150),
      coverImage,
      status: "PUBLISHED",
      eventDate: parseDateStr(event.event_start_date)
    });
  }

  if (newArticles.length > 0) {
    await prisma.article.createMany({ data: newArticles, skipDuplicates: true });
    console.log(`Inserted ${newArticles.length} new articles.`);
  }

  if (newEvents.length > 0) {
    await prisma.event.createMany({ data: newEvents, skipDuplicates: true });
    console.log(`Inserted ${newEvents.length} new events.`);
  }

  console.log("Batch seeding complete!");
}

main().catch(e => console.error(e)).finally(async () => await prisma.$disconnect());

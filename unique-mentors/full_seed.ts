import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const jsonPath = "/Users/harishs/Library/Mobile Documents/com~apple~CloudDocs/Desktop/uniquementors.com/unique-mentors/uniquementors_website_uniquementors.json";
  const assetsUploads = "/Users/harishs/Library/Mobile Documents/com~apple~CloudDocs/Desktop/uniquementors.com/unique-mentors/assets/uploads";
  const articlesUploads = path.join(process.cwd(), "public", "uploads", "articles");
  const eventsUploads = path.join(process.cwd(), "public", "uploads", "events");

  // Ensure directories exist
  if (!fs.existsSync(articlesUploads)) fs.mkdirSync(articlesUploads, { recursive: true });
  if (!fs.existsSync(eventsUploads)) fs.mkdirSync(eventsUploads, { recursive: true });

  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const data = JSON.parse(rawData);

  let tblPostData = [];
  let tblEventsData = [];

  for (const item of data) {
    if (item.type === "table" && item.name === "tbl_post") {
      tblPostData = item.data;
    }
    if (item.type === "table" && item.name === "tbl_events") {
      tblEventsData = item.data;
    }
  }

  console.log(`Found ${tblPostData.length} articles and ${tblEventsData.length} events.`);

  // Seed Articles
  for (const post of tblPostData) {
    await delay(300); // Prevent connection pool limit
    let coverImage = null;
    if (post.photo) {
      const srcPath = path.join(assetsUploads, post.photo);
      const destPath = path.join(articlesUploads, post.photo);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        coverImage = `/uploads/articles/${post.photo}`;
      }
    }

    try {
      await prisma.article.upsert({
        where: { slug: post.post_slug },
        update: {
          title: post.post_title,
          content: post.post_content || "",
          excerpt: (post.post_content || "").substring(0, 150),
          category: "General",
          coverImage,
          status: "PUBLISHED"
        },
        create: {
          title: post.post_title,
          slug: post.post_slug,
          content: post.post_content || "",
          excerpt: (post.post_content || "").substring(0, 150),
          category: "General",
          coverImage,
          status: "PUBLISHED",
          publishedAt: post.post_date ? new Date(post.post_date.split("-").reverse().join("-")) : new Date()
        }
      });
      console.log(`Seeded Article: ${post.post_title}`);
    } catch(err) {
      console.log("Error seeding", post.post_title, err.message);
    }
  }

  // Seed Events
  for (const event of tblEventsData) {
    await delay(300);
    let coverImage = null;
    if (event.photo) {
      const srcPath = path.join(assetsUploads, event.photo);
      const destPath = path.join(eventsUploads, event.photo);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        coverImage = `/uploads/events/${event.photo}`;
      }
    }

    try {
      await prisma.event.upsert({
        where: { slug: event.event_slug },
        update: {
          title: event.event_title,
          content: event.event_content || "",
          excerpt: (event.event_content || "").substring(0, 150),
          coverImage,
          status: "PUBLISHED"
        },
        create: {
          title: event.event_title,
          slug: event.event_slug,
          content: event.event_content || "",
          excerpt: (event.event_content || "").substring(0, 150),
          coverImage,
          status: "PUBLISHED",
          eventDate: event.event_start_date ? new Date(event.event_start_date.split("-").reverse().join("-")) : new Date()
        }
      });
      console.log(`Seeded Event: ${event.event_title}`);
    } catch (err) {
      console.log("Error seeding event", event.event_title, err.message);
    }
  }

  console.log("All seeding completed successfully!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

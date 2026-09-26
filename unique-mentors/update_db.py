import os

path = "lib/db.ts"
with open(path, "r") as f:
    content = f.read()

target = """const createPrismaClient = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
  });"""

replacement = """const createPrismaClient = () => {
  // Fix for Vercel build Prisma connection limits with Supabase pooler
  let url = process.env.DATABASE_URL || "";
  if (url.includes("pooler.supabase.com") && url.includes(":5432")) {
    url = url.replace(":5432", ":6543");
    if (!url.includes("pgbouncer=true")) {
      url += (url.includes("?") ? "&" : "?") + "pgbouncer=true";
    }
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: url
      }
    }
  });
};"""

content = content.replace(target, replacement)

with open(path, "w") as f:
    f.write(content)

print("Updated lib/db.ts successfully.")

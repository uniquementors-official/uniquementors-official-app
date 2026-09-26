import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const createPrismaClient = () => {
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
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;

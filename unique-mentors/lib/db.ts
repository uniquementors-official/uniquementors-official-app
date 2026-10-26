import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const createPrismaClient = () => {
  // Supabase transaction poolers are intentionally small. One Prisma connection
  // per app instance prevents a single request from exhausting the pool.
  let url = process.env.DATABASE_URL || "";
  if (url.includes("pooler.supabase.com")) {
    try {
      const poolerUrl = new URL(url);
      if (poolerUrl.port === "5432") poolerUrl.port = "6543";
      poolerUrl.searchParams.set("pgbouncer", "true");
      poolerUrl.searchParams.set("connection_limit", "1");
      poolerUrl.searchParams.set("pool_timeout", "60");
      poolerUrl.searchParams.set("connect_timeout", "15");
      url = poolerUrl.toString();
    } catch {
      // Leave an invalid URL untouched so Prisma can report the configuration error.
    }
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: {
      db: {
        url: url
      }
    }
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;

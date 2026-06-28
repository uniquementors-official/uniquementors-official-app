import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const objects = await prisma.$queryRaw`SELECT name FROM storage.objects WHERE bucket_id = 'uploads' AND name ILIKE '%UNIQUE%'`;
  console.log(objects);
}
main().finally(() => prisma.$disconnect());

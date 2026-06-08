# Unique Mentors

Production-ready Next.js site and admin CMS for Unique Mentors, a Kochi-based overseas medical licensing exam training centre.

## Tech Stack

- Next.js 14 App Router with TypeScript strict mode
- Tailwind CSS with shadcn-style UI primitives
- Prisma ORM with MongoDB Atlas
- NextAuth v5 credentials auth for `/admin`
- Framer Motion, Lucide React, Sonner, React Hook Form and Zod
- Cloudinary uploads, Resend or SMTP email, Sharp image optimization

## Getting Started

```bash
cd unique-mentors
npm install
cp .env.example .env.local
npm run db:generate
npm run dev
```

The site runs at `http://localhost:3000`.

## Database Setup

1. Create a free MongoDB Atlas cluster.
2. Create a database user and allow your local/Vercel IP.
3. Copy the MongoDB connection string into `DATABASE_URL`.
4. Push the Prisma schema:

```bash
npm run db:push
```

5. Seed admin, courses, blogs, testimonials and sample leads:

```bash
npm run db:seed
```

Default seeded admin:

- Email: `admin@uniquementors.com`
- Password: `Admin@2024!`

Change the password after first login.

## Environment Variables

Use `.env.example` as the source of truth. Required for production:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY` or SMTP credentials
- Cloudinary credentials for admin image uploads

## Running Locally

```bash
npm run dev
npm run typecheck
npm run lint
```

## Production Build

```bash
npm run build
npm run start
```

## Deploying to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add all environment variables from `.env.example`.
4. Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to `https://www.uniquementors.com`.
5. Deploy.
6. Run `npm run db:push` and `npm run db:seed` locally against the production MongoDB connection if needed.

## Admin CMS

Protected routes live under `/admin`.

- Dashboard: analytics overview and recent leads
- Blog Posts: rich text editor, SEO fields and cover upload
- Courses: course content, eligibility, syllabus and SEO preview
- Leads: enquiry inbox with status updates and CSV export
- Testimonials: add and manage student reviews
- Newsletter: compose campaigns
- Settings: site contact and announcement details

## SEO

Implemented:

- Correct `html lang="en"`
- Concise homepage title and meta description
- One clear homepage H1
- Page-specific metadata
- Canonicals and `en-IN` hreflang
- Organization, LocalBusiness, Website, Course, BlogPosting, Breadcrumb and FAQ schema
- `robots.ts` and `sitemap.ts`
- Clean `/blog/[slug]` and `/courses/[slug]` URLs
- Accessible social link labels in the footer

## Customization

Edit shared site content in:

- `lib/constants.ts` for contact, navigation, stats, services and social links
- `lib/content.ts` for public seed courses, blogs, FAQs and testimonials
- `prisma/seed.ts` for database seed records

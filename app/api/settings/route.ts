import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      // Return empty defaults if not seeded
      return ok({
        siteName: "Unique Mentors",
        tagline: "Empowering Global Healthcare Careers",
        description: "",
        phone: "",
        whatsapp: "",
        email: "",
        address: {},
        socialLinks: {},
        announcement: "",
        announcementOn: false,
        googleAnalytics: ""
      });
    }
    return ok(settings);
  } catch (error) {
    console.error("settings get error", error);
    return fail("Unable to fetch site settings", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);

    const body = await request.json();
    let settings = await prisma.siteSettings.findFirst();

    const data = {
      siteName: body.siteName ?? "Unique Mentors",
      tagline: body.tagline ?? "",
      description: body.description ?? "",
      phone: body.phone ?? "",
      whatsapp: body.whatsapp ?? "",
      email: body.email ?? "",
      address: body.address ?? {},
      socialLinks: body.socialLinks ?? {},
      announcement: body.announcement ?? "",
      announcementOn: Boolean(body.announcementOn),
      googleAnalytics: body.googleAnalytics ?? ""
    };

    if (settings) {
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data
      });
    } else {
      settings = await prisma.siteSettings.create({
        data
      });
    }

    return ok(settings, "Settings saved successfully.");
  } catch (error) {
    console.error("settings post error", error);
    return fail("Unable to save settings", 500);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { region = "Unknown", userAgent = "" } = body;

    // Get IP for region tracking
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "Unknown";

    // Log the download event in AnalyticsEvent table
    await prisma.analyticsEvent.create({
      data: {
        eventName: "brochure_download",
        distinctId: ip,
        path: "/brochure",
        userAgent: userAgent || req.headers.get("user-agent") || "",
        properties: {
          region,
          ip,
          downloadedAt: new Date().toISOString(),
        },
      },
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
      return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
    }

    // Since the 'uploads' bucket is public, we can just return the public URL directly!
    // No need to generate a presigned URL which requires a valid JWT service key.
    const filePath = "unique-mentors/bronchure/UNIQUE MENTORS - PORTFOLIO 2025.pdf";
    // We encode the file path so spaces become %20 but the slashes remain intact
    const encodedPath = filePath.split('/').map(encodeURIComponent).join('/');
    const fullUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${encodedPath}`;

    return NextResponse.json({ url: fullUrl });
  } catch (error) {
    console.error("Brochure download error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

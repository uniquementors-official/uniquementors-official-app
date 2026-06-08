import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { sendContactEmail } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
    if (!limited.allowed) return fail("Too many requests. Please try again later.", 429);

    const payload = contactSchema.parse(await request.json());
    const lead = await prisma.lead.create({
      data: {
        name: payload.name,
        email: payload.email || undefined,
        phone: payload.phone,
        profession: payload.profession || undefined,
        examType: payload.examType || undefined,
        message: payload.message || undefined,
        source: "CONTACT",
        status: "NEW"
      }
    });

    await sendContactEmail(payload);
    return ok({ id: lead.id }, "Enquiry submitted successfully.");
  } catch (error) {
    console.error("contact route error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid contact form data", 422);
    return fail("Unable to submit enquiry", 500);
  }
}

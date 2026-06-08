import crypto from "crypto";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { sendWelcomeEmail } from "@/lib/email";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = newsletterSchema.parse(await request.json());
    const existing = await prisma.newsletter.findUnique({ where: { email: payload.email.toLowerCase() } });

    if (existing?.subscribed) {
      return ok({ email: existing.email }, "You are already subscribed.");
    }

    const subscriber = existing
      ? await prisma.newsletter.update({
          where: { email: payload.email.toLowerCase() },
          data: { subscribed: true, unsubscribedAt: null }
        })
      : await prisma.newsletter.create({
          data: {
            email: payload.email.toLowerCase(),
            unsubscribeKey: crypto.randomBytes(20).toString("hex"),
            subscribed: true
          }
        });

    await sendWelcomeEmail(subscriber.email, "there");
    return ok({ email: subscriber.email }, "Newsletter subscription confirmed.");
  } catch (error) {
    console.error("newsletter route error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid email", 422);
    return fail("Unable to subscribe", 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const payload = newsletterSchema.parse(await request.json());
    const subscriber = await prisma.newsletter.update({
      where: { email: payload.email.toLowerCase() },
      data: { subscribed: false, unsubscribedAt: new Date() }
    });
    return ok({ email: subscriber.email }, "You have been unsubscribed.");
  } catch (error) {
    console.error("newsletter delete error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid email", 422);
    return fail("Unable to unsubscribe", 500);
  }
}

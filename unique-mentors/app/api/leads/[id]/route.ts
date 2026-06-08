import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { leadUpdateSchema } from "@/lib/validators";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);
    const payload = leadUpdateSchema.parse(await request.json());
    const lead = await prisma.lead.update({ where: { id: params.id }, data: payload });
    return ok(lead, "Lead updated.");
  } catch (error) {
    console.error("lead patch error", error);
    if (error instanceof ZodError) return fail(error.errors[0]?.message || "Invalid lead data", 422);
    return fail("Unable to update lead", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Unauthorized", 401);
    await prisma.lead.delete({ where: { id: params.id } });
    return ok({ id: params.id }, "Lead deleted.");
  } catch (error) {
    console.error("lead delete error", error);
    return fail("Unable to delete lead", 500);
  }
}

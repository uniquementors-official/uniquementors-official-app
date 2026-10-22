const MINIMUM_COMPLETION_MS = 1_500;
const MAXIMUM_FORM_AGE_MS = 24 * 60 * 60 * 1_000;

type ProtectedSubmission = {
  website?: unknown;
  formStartedAt?: unknown;
};

export function validateFormProtection(body: unknown): string | null {
  if (!body || typeof body !== "object") return "Unable to validate this submission.";

  const { website, formStartedAt } = body as ProtectedSubmission;
  if (typeof website === "string" && website.trim()) return "Unable to validate this submission.";
  if (typeof formStartedAt !== "number" || !Number.isFinite(formStartedAt)) {
    return "Please refresh the form and try again.";
  }

  const elapsed = Date.now() - formStartedAt;
  if (elapsed < MINIMUM_COMPLETION_MS || elapsed > MAXIMUM_FORM_AGE_MS) {
    return "Please take a moment to complete the form and try again.";
  }

  return null;
}

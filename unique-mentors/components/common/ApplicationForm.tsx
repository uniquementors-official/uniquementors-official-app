"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { applicationSchema } from "@/lib/validators";
import { COUNTRIES_SERVED, PROFESSIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/common/Icon";

type ApplicationValues = z.infer<typeof applicationSchema>;

const steps = ["Personal Info", "Professional Info", "Confirmation"];

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [reference, setReference] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      examType: "MOH",
      targetCountry: "UAE"
    }
  });

  const values = watch();
  const currentFields = useMemo(() => {
    if (step === 0) return ["name", "email", "phone", "location"] as const;
    if (step === 1) return ["profession", "experience", "examType", "targetCountry"] as const;
    return [] as const;
  }, [step]);

  async function goNext() {
    const valid = await trigger(currentFields);
    if (valid) setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function onSubmit(data: ApplicationValues) {
    const response = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = (await response.json()) as { success: boolean; data?: { referenceNumber: string }; error?: string };
    if (!result.success) {
      toast.error(result.error || "Unable to submit application");
      return;
    }
    setReference(result.data?.referenceNumber ?? "Submitted");
    reset();
    toast.success("Application submitted.");
  }

  if (reference) {
    return (
      <div className="surface p-8 text-center">
        <Icon name="CheckCircle" className="mx-auto h-12 w-12 text-secondary" />
        <h2 className="mt-4 font-display text-2xl font-bold">Application submitted</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Reference number: {reference}</p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Our counselling team will call you with the next steps.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="surface p-6">
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {steps.map((label, index) => (
          <div key={label} className={index <= step ? "rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white" : "rounded-md bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500 dark:bg-slate-900"}>
            {index + 1}. {label}
          </div>
        ))}
      </div>

      {step === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="apply-name" label="Full Name" error={errors.name?.message}>
            <Input id="apply-name" {...register("name")} />
          </Field>
          <Field id="apply-email" label="Email" error={errors.email?.message}>
            <Input id="apply-email" type="email" {...register("email")} />
          </Field>
          <Field id="apply-phone" label="Phone" error={errors.phone?.message}>
            <Input id="apply-phone" {...register("phone")} />
          </Field>
          <Field id="apply-location" label="Location" error={errors.location?.message}>
            <Input id="apply-location" {...register("location")} />
          </Field>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="apply-profession" label="Profession" error={errors.profession?.message}>
            <select id="apply-profession" className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" {...register("profession")}>
              <option value="">Select profession</option>
              {PROFESSIONS.map((profession) => (
                <option key={profession.label} value={profession.label}>
                  {profession.label}
                </option>
              ))}
            </select>
          </Field>
          <Field id="apply-experience" label="Years Experience" error={errors.experience?.message}>
            <Input id="apply-experience" placeholder="Example: 2 years" {...register("experience")} />
          </Field>
          <Field id="apply-exam" label="Exam Type" error={errors.examType?.message}>
            <select id="apply-exam" className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" {...register("examType")}>
              {["MOH", "DHA", "HAAD", "CORU", "Canada", "Australia"].map((exam) => (
                <option key={exam} value={exam}>
                  {exam}
                </option>
              ))}
            </select>
          </Field>
          <Field id="apply-country" label="Target Country" error={errors.targetCountry?.message}>
            <select id="apply-country" className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" {...register("targetCountry")}>
              {COUNTRIES_SERVED.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </Field>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Name", values.name],
              ["Email", values.email],
              ["Phone", values.phone],
              ["Location", values.location],
              ["Profession", values.profession],
              ["Experience", values.experience],
              ["Exam", values.examType],
              ["Target Country", values.targetCountry]
            ].map(([label, value]) => (
              <div key={label} className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
                <p className="mt-1 font-medium">{value}</p>
              </div>
            ))}
          </div>
          <Field id="apply-message" label="Message">
            <Textarea id="apply-message" {...register("message")} />
          </Field>
        </div>
      ) : null}

      <div className="mt-8 flex justify-between gap-3">
        <Button type="button" variant="outline" disabled={step === 0 || isSubmitting} onClick={() => setStep((current) => Math.max(current - 1, 0))}>
          Back
        </Button>
        {step < 2 ? (
          <Button type="button" onClick={goNext}>
            Continue
            <Icon name="ArrowRight" className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Send" className="h-4 w-4" />}
            Submit Application
          </Button>
        )}
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

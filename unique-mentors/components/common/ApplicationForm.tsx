"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { applicationSchema, studyAbroadApplicationSchema } from "@/lib/validators";
import { COUNTRIES_SERVED, PROFESSIONS } from "@/lib/constants";
import { getAnalyticsContext, identifyAnalyticsUser, trackAnalyticsEvent } from "@/lib/analytics-client";
import { HoneypotField, useFormProtection } from "@/components/common/FormProtection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/common/Icon";

type ApplicationValues = z.infer<typeof applicationSchema>;
type StudyAbroadValues = z.infer<typeof studyAbroadApplicationSchema>;
type ApplicationFormProps = { mode?: "medical" | "study-abroad"; studyAbroadCountries?: string[] };

const medicalSteps = ["Personal Info", "Professional Info", "Confirmation"];
const studyAbroadSteps = ["Personal Info", "Study Preferences", "Confirmation"];

export function ApplicationForm({ mode = "medical", studyAbroadCountries = [] }: ApplicationFormProps) {
  return mode === "study-abroad" ? <StudyAbroadApplicationForm countries={studyAbroadCountries} /> : <MedicalApplicationForm />;
}

function MedicalApplicationForm() {
  const [step, setStep] = useState(0);
  const [reference, setReference] = useState<string | null>(null);
  const { protection, honeypot, resetProtection } = useFormProtection();
  const { register, handleSubmit, trigger, watch, reset, formState: { errors, isSubmitting } } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { examType: "MOH", targetCountry: "UAE" }
  });
  const values = watch();
  const currentFields = useMemo(() => step === 0 ? (["name", "email", "phone", "location"] as const) : step === 1 ? (["profession", "experience", "examType", "targetCountry"] as const) : ([] as const), [step]);

  async function goNext() {
    if (await trigger(currentFields)) {
      trackAnalyticsEvent("application_step_completed", { step: medicalSteps[step], stepIndex: step + 1, examType: values.examType, targetCountry: values.targetCountry, profession: values.profession });
      setStep((current) => Math.min(current + 1, medicalSteps.length - 1));
    }
  }

  async function onSubmit(data: ApplicationValues) {
    const response = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, ...protection, analytics: getAnalyticsContext() }) });
    const result = (await response.json()) as { success: boolean; data?: { referenceNumber: string }; error?: string };
    if (!result.success) return toast.error(result.error || "Unable to submit application");
    identifyAnalyticsUser({ email: data.email, name: data.name, phone: data.phone, profession: data.profession, examType: data.examType, source: "application_form" });
    trackAnalyticsEvent("application_submitted", { examType: data.examType, targetCountry: data.targetCountry, profession: data.profession, referenceNumber: result.data?.referenceNumber });
    setReference(result.data?.referenceNumber ?? "Submitted");
    reset();
    resetProtection();
    toast.success("Application submitted.");
  }

  if (reference) return <SuccessPanel reference={reference} label="Application submitted" />;

  return <form onSubmit={handleSubmit(onSubmit)} className="surface relative p-6">
    <HoneypotField website={honeypot.website} onChange={honeypot.setWebsite} />
    <Steps steps={medicalSteps} currentStep={step} />
    {step === 0 ? <PersonalFields register={register} errors={errors} /> : null}
    {step === 1 ? <MedicalFields register={register} errors={errors} /> : null}
    {step === 2 ? <MedicalConfirmation values={values} register={register} /> : null}
    <FormActions step={step} stepCount={medicalSteps.length} isSubmitting={isSubmitting} onBack={() => setStep((current) => Math.max(current - 1, 0))} onNext={goNext} />
  </form>;
}

function StudyAbroadApplicationForm({ countries }: { countries: string[] }) {
  const [step, setStep] = useState(0);
  const [reference, setReference] = useState<string | null>(null);
  const { protection, honeypot, resetProtection } = useFormProtection();
  const destinationOptions = Array.from(new Set(countries.map((country) => country.trim()).filter(Boolean))).sort();
  const { register, handleSubmit, trigger, watch, reset, formState: { errors, isSubmitting } } = useForm<StudyAbroadValues>({
    resolver: zodResolver(studyAbroadApplicationSchema),
    defaultValues: { targetCountry: destinationOptions[0] || "Other", otherCountry: "" }
  });
  const values = watch();
  const currentFields = useMemo(() => step === 0 ? (["name", "email", "phone", "location"] as const) : step === 1 ? (values.targetCountry === "Other" ? (["qualification", "targetCountry", "otherCountry"] as const) : (["qualification", "targetCountry"] as const)) : ([] as const), [step, values.targetCountry]);

  async function goNext() {
    if (await trigger(currentFields)) {
      trackAnalyticsEvent("study_abroad_application_step_completed", { step: studyAbroadSteps[step], stepIndex: step + 1, targetCountry: values.targetCountry, qualification: values.qualification });
      setStep((current) => Math.min(current + 1, studyAbroadSteps.length - 1));
    }
  }

  async function onSubmit(data: StudyAbroadValues) {
    const targetCountry = data.targetCountry === "Other" ? data.otherCountry?.trim() || "Other" : data.targetCountry;
    const response = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, targetCountry, applicationType: "STUDY_ABROAD", ...protection, analytics: getAnalyticsContext() }) });
    const result = (await response.json()) as { success: boolean; data?: { referenceNumber: string }; error?: string };
    if (!result.success) return toast.error(result.error || "Unable to submit your request");
    identifyAnalyticsUser({ email: data.email, name: data.name, phone: data.phone, profession: data.qualification, source: "study_abroad_application" });
    trackAnalyticsEvent("study_abroad_application_submitted", { targetCountry, qualification: data.qualification, referenceNumber: result.data?.referenceNumber });
    setReference(result.data?.referenceNumber ?? "Submitted");
    reset();
    resetProtection();
    toast.success("Study Abroad application submitted.");
  }

  if (reference) return <SuccessPanel reference={reference} label="Study Abroad application submitted" />;

  return <form onSubmit={handleSubmit(onSubmit)} className="surface relative p-6">
    <HoneypotField website={honeypot.website} onChange={honeypot.setWebsite} />
    <Steps steps={studyAbroadSteps} currentStep={step} />
    {step === 0 ? <PersonalFields register={register} errors={errors} /> : null}
    {step === 1 ? <div className="grid gap-4 sm:grid-cols-2">
      <Field id="study-qualification" label="Highest Qualification" error={errors.qualification?.message}><Input id="study-qualification" placeholder="Example: BSc Nursing" {...register("qualification")} /></Field>
      <Field id="study-country" label="Preferred Study Destination" error={errors.targetCountry?.message}><select id="study-country" className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" {...register("targetCountry")}>{destinationOptions.map((country) => <option key={country} value={country}>{country}</option>)}<option value="Other">Other country</option></select></Field>
      {values.targetCountry === "Other" ? <Field id="study-other-country" label="Country Name" error={errors.otherCountry?.message}><Input id="study-other-country" placeholder="Enter preferred country" {...register("otherCountry")} /></Field> : null}
    </div> : null}
    {step === 2 ? <div className="grid gap-3 sm:grid-cols-2">{[["Name", values.name], ["Email", values.email], ["Phone", values.phone], ["Location", values.location], ["Qualification", values.qualification], ["Destination", values.targetCountry === "Other" ? values.otherCountry : values.targetCountry]].map(([label, value]) => <SummaryCard key={String(label)} label={String(label)} value={String(value || "")} />)}</div> : null}
    <FormActions step={step} stepCount={studyAbroadSteps.length} isSubmitting={isSubmitting} onBack={() => setStep((current) => Math.max(current - 1, 0))} onNext={goNext} submitLabel="Submit Study Abroad Application" />
  </form>;
}

function PersonalFields({ register, errors }: { register: any; errors: any }) {
  return <div className="grid gap-4 sm:grid-cols-2">
    <Field id="apply-name" label="Full Name" error={errors.name?.message}><Input id="apply-name" {...register("name")} /></Field>
    <Field id="apply-email" label="Email" error={errors.email?.message}><Input id="apply-email" type="email" {...register("email")} /></Field>
    <Field id="apply-phone" label="Phone" error={errors.phone?.message}><Input id="apply-phone" {...register("phone")} /></Field>
    <Field id="apply-location" label="Location" error={errors.location?.message}><Input id="apply-location" {...register("location")} /></Field>
  </div>;
}

function MedicalFields({ register, errors }: { register: any; errors: any }) {
  return <div className="grid gap-4 sm:grid-cols-2">
    <Field id="apply-profession" label="Profession" error={errors.profession?.message}><select id="apply-profession" className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" {...register("profession")}><option value="">Select profession</option>{PROFESSIONS.map((profession) => <option key={profession.label} value={profession.label}>{profession.label}</option>)}</select></Field>
    <Field id="apply-experience" label="Years Experience" error={errors.experience?.message}><Input id="apply-experience" placeholder="Example: 2 years" {...register("experience")} /></Field>
    <Field id="apply-exam" label="Exam Type" error={errors.examType?.message}><select id="apply-exam" className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" {...register("examType")}>{["MOH", "DHA", "HAAD", "CORU", "Canada", "Australia"].map((exam) => <option key={exam} value={exam}>{exam}</option>)}</select></Field>
    <Field id="apply-country" label="Target Country" error={errors.targetCountry?.message}><select id="apply-country" className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" {...register("targetCountry")}>{COUNTRIES_SERVED.map((country) => <option key={country} value={country}>{country}</option>)}</select></Field>
  </div>;
}

function MedicalConfirmation({ values, register }: { values: ApplicationValues; register: any }) {
  return <div className="space-y-5"><div className="grid gap-3 sm:grid-cols-2">{[["Name", values.name], ["Email", values.email], ["Phone", values.phone], ["Location", values.location], ["Profession", values.profession], ["Experience", values.experience], ["Exam", values.examType], ["Target Country", values.targetCountry]].map(([label, value]) => <SummaryCard key={String(label)} label={String(label)} value={String(value || "")} />)}</div><Field id="apply-message" label="Message"><Textarea id="apply-message" {...register("message")} /></Field></div>;
}

function Steps({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return <div className="mb-8 grid gap-3 sm:grid-cols-3">{steps.map((label, index) => <div key={label} className={index <= currentStep ? "rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white" : "rounded-md bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500 dark:bg-slate-900"}>{index + 1}. {label}</div>)}</div>;
}

function SummaryCard({ label, value }: { label: string; value?: string }) {
  return <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p><p className="mt-1 font-medium">{value || "-"}</p></div>;
}

function FormActions({ step, stepCount, isSubmitting, onBack, onNext, submitLabel = "Submit Application" }: { step: number; stepCount: number; isSubmitting: boolean; onBack: () => void; onNext: () => void; submitLabel?: string }) {
  return <div className="mt-8 flex justify-between gap-3"><Button type="button" variant="outline" disabled={step === 0 || isSubmitting} onClick={onBack}>Back</Button>{step < stepCount - 1 ? <Button type="button" onClick={onNext}>Continue<Icon name="ArrowRight" className="h-4 w-4" /></Button> : <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Send" className="h-4 w-4" />}{submitLabel}</Button>}</div>;
}

function SuccessPanel({ reference, label }: { reference: string; label: string }) {
  return <div className="surface p-8 text-center"><Icon name="CheckCircle" className="mx-auto h-12 w-12 text-secondary" /><h2 className="mt-4 font-display text-2xl font-bold">{label}</h2><p className="mt-2 text-slate-600 dark:text-slate-300">Reference number: {reference}</p><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Our counselling team will call you with the next steps.</p></div>;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return <div><Label htmlFor={id}>{label}</Label><div className="mt-2">{children}</div>{error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}</div>;
}

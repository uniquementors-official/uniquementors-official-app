"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { contactSchema } from "@/lib/validators";
import { PROFESSIONS } from "@/lib/constants";
import { getAnalyticsContext, identifyAnalyticsUser, trackAnalyticsEvent } from "@/lib/analytics-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/common/Icon";
import { HoneypotField, useFormProtection } from "@/components/common/FormProtection";

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const router = useRouter();
  const { protection, honeypot, resetProtection } = useFormProtection();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  async function onSubmit(values: ContactFormValues) {
    trackAnalyticsEvent("contact_form_submit_attempted", {
      examType: values.examType,
      profession: values.profession
    });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, ...protection, analytics: getAnalyticsContext() })
    });
    const result = (await response.json()) as { success: boolean; error?: string };
    if (!result.success) {
      trackAnalyticsEvent("contact_form_error", {
        examType: values.examType,
        profession: values.profession,
        error: result.error || "Unable to send enquiry"
      });
      toast.error(result.error || "Unable to send enquiry");
      return;
    }
    identifyAnalyticsUser({
      email: values.email,
      name: values.name,
      phone: values.phone,
      profession: values.profession,
      examType: values.examType,
      source: "contact_form"
    });
    trackAnalyticsEvent("contact_form_submitted", {
      examType: values.examType,
      profession: values.profession,
      email: values.email,
      phone: values.phone,
      name: values.name
    });
    reset();
    resetProtection();
    router.push("/thank-you?type=contact");
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="surface relative space-y-5 p-6">
      <HoneypotField website={honeypot.website} onChange={honeypot.setWebsite} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" className="mt-2" {...register("name")} />
          {errors.name ? <p className="mt-1 text-xs text-destructive">{errors.name.message}</p> : null}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" className="mt-2" {...register("email")} />
          {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email.message}</p> : null}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" className="mt-2" {...register("phone")} />
          {errors.phone ? <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p> : null}
        </div>
        <div>
          <Label htmlFor="profession">Profession</Label>
          <select id="profession" className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm" {...register("profession")}>
            <option value="">Select profession</option>
            {PROFESSIONS.map((profession) => (
              <option key={profession.label} value={profession.label}>
                {profession.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="examType">Exam Interest</Label>
        <select id="examType" className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm" {...register("examType")}>
          <option value="">Select exam</option>
          {["MOH", "DHA", "HAAD", "CORU", "Canada", "Australia", "Other"].map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" className="mt-2" {...register("message")} />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Send" className="h-4 w-4" />}
        Submit Enquiry
      </Button>
    </form>
  );
}

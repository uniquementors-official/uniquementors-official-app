import nodemailer from "nodemailer";
import { Resend } from "resend";
import { SITE_CONFIG } from "@/lib/constants";

type ContactEmailData = {
  name: string;
  email?: string;
  phone: string;
  profession?: string;
  examType?: string;
  message?: string;
};

type ApplicationEmailData = ContactEmailData & {
  location?: string;
  experience?: string;
  targetCountry?: string;
  referenceNumber?: string;
};

type EmailResult = {
  delivered: boolean;
  provider: "resend" | "smtp" | "none";
  id?: string;
  reason?: string;
};

const fromEmail = process.env.FROM_EMAIL || "noreply@uniquementors.com";
const adminEmail = process.env.ADMIN_EMAIL || SITE_CONFIG.email;

function renderLayout(title: string, body: string) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f6f8fb;padding:28px;color:#122033">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
        <div style="background:#061733;color:#ffffff;padding:22px 26px">
          <strong style="font-size:18px">${SITE_CONFIG.name}</strong>
          <p style="margin:6px 0 0;color:#b9d7ff">${SITE_CONFIG.tagline}</p>
        </div>
        <div style="padding:26px">
          <h1 style="font-size:22px;line-height:1.3;margin:0 0 16px">${title}</h1>
          ${body}
        </div>
        <div style="padding:18px 26px;background:#f8fafc;color:#475569;font-size:13px">
          ${SITE_CONFIG.address.display}<br />
          ${SITE_CONFIG.phone} · ${SITE_CONFIG.email}
        </div>
      </div>
    </div>
  `;
}

async function sendMail(to: string | string[], subject: string, html: string): Promise<EmailResult> {
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const response = await resend.emails.send({
      from: `${SITE_CONFIG.name} <${fromEmail}>`,
      to,
      subject,
      html
    });
    return { delivered: true, provider: "resend", id: response.data?.id };
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    const response = await transporter.sendMail({
      from: `${SITE_CONFIG.name} <${fromEmail}>`,
      to,
      subject,
      html
    });
    return { delivered: true, provider: "smtp", id: response.messageId };
  }

  return { delivered: false, provider: "none", reason: "Email transport not configured" };
}

export async function sendContactEmail(data: ContactEmailData) {
  const adminBody = renderLayout(
    "New counselling enquiry",
    `<p><strong>Name:</strong> ${data.name}</p>
     <p><strong>Phone:</strong> ${data.phone}</p>
     <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
     <p><strong>Profession:</strong> ${data.profession || "Not selected"}</p>
     <p><strong>Exam interest:</strong> ${data.examType || "Not selected"}</p>
     <p><strong>Message:</strong><br />${data.message || "No message"}</p>`
  );
  const results = [await sendMail(adminEmail, `New enquiry from ${data.name}`, adminBody)];

  if (data.email) {
    const userBody = renderLayout(
      "We received your enquiry",
      `<p>Hi ${data.name},</p>
       <p>Thank you for contacting Unique Mentors. Our counselling team will review your details and get in touch shortly.</p>
       <p>You can also call us directly at <strong>${SITE_CONFIG.phone}</strong>.</p>`
    );
    results.push(await sendMail(data.email, "Unique Mentors received your enquiry", userBody));
  }

  return results;
}

export async function sendApplicationEmail(data: ApplicationEmailData) {
  const reference = data.referenceNumber || "Pending";
  const adminBody = renderLayout(
    "New training application",
    `<p><strong>Reference:</strong> ${reference}</p>
     <p><strong>Name:</strong> ${data.name}</p>
     <p><strong>Phone:</strong> ${data.phone}</p>
     <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
     <p><strong>Location:</strong> ${data.location || "Not provided"}</p>
     <p><strong>Profession:</strong> ${data.profession || "Not selected"}</p>
     <p><strong>Experience:</strong> ${data.experience || "Not provided"}</p>
     <p><strong>Exam type:</strong> ${data.examType || "Not selected"}</p>
     <p><strong>Target country:</strong> ${data.targetCountry || "Not selected"}</p>`
  );
  const results = [await sendMail(adminEmail, `New application ${reference}`, adminBody)];

  if (data.email) {
    results.push(await sendWelcomeEmail(data.email, data.name, reference));
  }

  return results;
}

export async function sendWelcomeEmail(email: string, name = "there", referenceNumber?: string) {
  const body = renderLayout(
    "Your next steps with Unique Mentors",
    `<p>Hi ${name},</p>
     <p>Your application has been received${referenceNumber ? ` with reference <strong>${referenceNumber}</strong>` : ""}.</p>
     <p>Our team will contact you with counselling slots, eligibility guidance and the best training pathway for your goals.</p>`
  );
  return sendMail(email, "Welcome to Unique Mentors", body);
}

export async function sendNewsletterEmail(emails: string[], subject: string, content: string) {
  const body = renderLayout(subject, content);
  return sendMail(emails, subject, body);
}

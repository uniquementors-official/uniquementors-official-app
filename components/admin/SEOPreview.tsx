import { SITE_CONFIG } from "@/lib/constants";

type SEOPreviewProps = {
  title: string;
  description: string;
  slug: string;
};

export function SEOPreview({ title, description, slug }: SEOPreviewProps) {
  const titleCount = title.length;
  const descCount = description.length;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <p className="text-sm text-emerald-700 dark:text-emerald-300">{SITE_CONFIG.url}/{slug}</p>
      <h3 className="mt-1 text-lg font-medium text-blue-700">{title || "SEO title preview"}</h3>
      <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">{description || "SEO description preview"}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <span className={titleCount <= 60 ? "text-emerald-600" : "text-amber-600"}>Title: {titleCount}/60</span>
        <span className={descCount <= 160 ? "text-emerald-600" : "text-amber-600"}>Description: {descCount}/160</span>
      </div>
    </div>
  );
}

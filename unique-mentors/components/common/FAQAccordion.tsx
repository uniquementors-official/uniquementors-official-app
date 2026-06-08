import type { FaqItem } from "@/types";
import { Icon } from "@/components/common/Icon";

export function FAQAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="surface group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {faq.question}
            <Icon name="ChevronDown" className="h-4 w-4 transition group-open:rotate-180" />
          </summary>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

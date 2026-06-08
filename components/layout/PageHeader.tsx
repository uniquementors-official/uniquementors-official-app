import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { SchemaMarkup } from "@/components/common/SchemaMarkup";
import { BreadcrumbSchema } from "@/lib/seo";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  breadcrumbs: Array<{ name: string; href: string }>;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: ReactNode;
};

export function PageHeader({ title, subtitle, breadcrumbs, primaryCta, secondaryCta, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-brand-navy pb-16 pt-32 text-white">
      <SchemaMarkup schema={BreadcrumbSchema(breadcrumbs)} />
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
      <div className="container relative">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/75" aria-label="Breadcrumb">
          {breadcrumbs.map((item, index) => (
            <span key={item.href} className="flex items-center gap-2">
              {index > 0 ? <Icon name="ChevronRight" className="h-4 w-4" /> : null}
              {index === breadcrumbs.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-white">
                  {item.name}
                </Link>
              )}
            </span>
          ))}
        </nav>
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
          {subtitle ? <p className="mt-5 text-lg leading-8 text-slate-200">{subtitle}</p> : null}
          {children}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta ? (
                <Button asChild variant="secondary" size="lg">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand-navy">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { Icon } from "@/components/common/Icon";
import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  variant?: "spinner" | "course" | "blog" | "page";
  className?: string;
};

export function LoadingSpinner({ variant = "spinner", className }: LoadingSpinnerProps) {
  if (variant === "course" || variant === "blog") {
    return (
      <div className={cn("surface overflow-hidden", className)}>
        <div className="skeleton aspect-video rounded-b-none" />
        <div className="space-y-3 p-5">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-6 w-4/5" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (variant === "page") {
    return (
      <div className={cn("flex min-h-[50vh] items-center justify-center", className)}>
        <div className="flex items-center gap-3 rounded-md bg-white px-5 py-4 shadow-soft dark:bg-slate-900">
          <Icon name="Loader2" className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Loading Unique Mentors</span>
        </div>
      </div>
    );
  }

  return <Icon name="Loader2" className={cn("animate-spin text-primary", className)} />;
}

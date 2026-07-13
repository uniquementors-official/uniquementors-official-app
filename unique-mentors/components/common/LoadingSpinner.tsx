import { Icon } from "@/components/common/Icon";
import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
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
    return <PageLoadingSkeleton className={cn("min-h-[50vh] py-16", className)} />;
  }

  return <Icon name="Loader2" className={cn("animate-spin text-primary", className)} />;
}

import { cn } from "@/lib/utils";

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} />;
}

export function PageLoadingSkeleton({ className }: { className?: string }) {
  return (
    <main
      aria-label="Loading page"
      className={cn(
        "min-h-screen bg-background px-4 py-24 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <SkeletonBlock className="h-9 w-44 rounded-full" />
            <div className="space-y-3">
              <SkeletonBlock className="h-12 w-full max-w-2xl sm:h-16" />
              <SkeletonBlock className="h-12 w-10/12 max-w-xl sm:h-16" />
            </div>
            <div className="space-y-3">
              <SkeletonBlock className="h-4 w-full max-w-xl" />
              <SkeletonBlock className="h-4 w-11/12 max-w-lg" />
              <SkeletonBlock className="h-4 w-8/12 max-w-md" />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <SkeletonBlock className="h-12 w-40" />
              <SkeletonBlock className="h-12 w-36" />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-3 shadow-soft">
            <SkeletonBlock className="aspect-[4/3] w-full" />
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-border bg-card p-4 shadow-soft"
            >
              <SkeletonBlock className="mb-5 h-10 w-10 rounded-full" />
              <SkeletonBlock className="mb-3 h-4 w-28" />
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="mt-2 h-3 w-9/12" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

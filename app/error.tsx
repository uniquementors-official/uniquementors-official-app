"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
      <div className="max-w-md">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-destructive">Error</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Something went wrong</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Please retry the page or contact the Unique Mentors team.</p>
        <Button className="mt-6" onClick={reset}>
          Retry
        </Button>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/common/Icon";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="fixed bottom-5 left-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-brand-ink shadow-soft transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Icon name="ArrowUp" />
    </button>
  );
}

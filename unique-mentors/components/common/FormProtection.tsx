"use client";

import { useState } from "react";

export function useFormProtection() {
  const [website, setWebsite] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());

  return {
    protection: { website, formStartedAt },
    resetProtection: () => {
      setWebsite("");
      setFormStartedAt(Date.now());
    },
    honeypot: { website, setWebsite }
  };
}

export function HoneypotField({ website, onChange }: { website: string; onChange: (value: string) => void }) {
  return (
    <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor="company-website">Company website</label>
      <input
        id="company-website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

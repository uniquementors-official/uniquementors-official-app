import { cn } from "@/lib/utils";

type SvgProps = {
  className?: string;
};

export function FacebookIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-5 w-5", className)} fill="currentColor">
      <path d="M14.4 8.3V6.7c0-.8.3-1.3 1.4-1.3h1.6V2.6c-.8-.1-1.6-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.2v1.7H8.2v3.1h2.6v8.2h3.2v-8.2h2.6l.4-3.1h-3Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-5 w-5", className)} fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function YoutubeIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-5 w-5", className)} fill="currentColor">
      <path d="M21.4 7.1a3 3 0 0 0-2.1-2.1C17.5 4.5 12 4.5 12 4.5s-5.5 0-7.3.5a3 3 0 0 0-2.1 2.1A31.4 31.4 0 0 0 2.1 12c0 1.6.1 3.3.5 4.9a3 3 0 0 0 2.1 2.1c1.8.5 7.3.5 7.3.5s5.5 0 7.3-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.3.5-4.9 0-1.6-.1-3.3-.5-4.9ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-5 w-5", className)} fill="currentColor">
      <path d="M5.1 8.7H2.9v12h2.2v-12ZM4 3.2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM20.8 14c0-3.5-1.9-5.1-4.3-5.1-2 0-2.9 1.1-3.4 1.9V8.7h-2.2v12h2.2v-6c0-1.6.3-3.2 2.3-3.2 1.9 0 2 1.8 2 3.3v5.9h2.2V14Z" />
    </svg>
  );
}

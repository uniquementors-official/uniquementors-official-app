import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlayStoreButtonProps = Omit<ButtonProps, "children" | "asChild"> & {
  href: string;
};

export function PlayStoreButton({ className, href, ...props }: PlayStoreButtonProps) {
  return (
    <Button asChild className={cn("h-12 gap-2 px-4", className)} {...props}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Unique Mentors on Google Play"
        data-analytics-event="play_store_clicked"
        data-analytics-label="Google Play"
      >
        <PlayStoreIcon className="h-5 w-5" />
        <span className="flex flex-col items-start justify-center pr-2 text-left">
          <span className="text-[10px] font-light leading-none tracking-normal">GET IT ON</span>
          <span className="text-base font-bold leading-none">Google Play</span>
        </span>
      </a>
    </Button>
  );
}

function PlayStoreIcon({ fill = "currentColor", ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} aria-hidden="true" {...props}>
      <path d="m21.762 9.942L4.67.378C3.949-.088 3.035-.126 2.277.279 1.509.69 1.031 1.487 1.031 2.359v19.282c0 .872.477 1.668 1.246 2.079.755.404 1.668.37 2.393-.098l17.092-9.564c.756-.423 1.207-1.192 1.207-2.058s-.451-1.635-1.207-2.058Zm-5.746-1.413-2.36 2.36L5.302 2.534l10.714 5.995ZM2.604 21.906V2.094l9.941 9.906-9.941 9.906Zm2.698-.439 8.355-8.355 2.36 2.36-10.714 5.995Zm15.692-8.78-3.552 1.987L14.768 12l2.674-2.674 3.552 1.987c.363.203.402.548.402.686s-.039.483-.402.686Z" />
    </svg>
  );
}

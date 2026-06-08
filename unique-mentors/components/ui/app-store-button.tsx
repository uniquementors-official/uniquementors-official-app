import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppStoreButtonProps = Omit<ButtonProps, "children" | "asChild"> & {
  href: string;
};

export function AppStoreButton({ className, href, ...props }: AppStoreButtonProps) {
  return (
    <Button asChild className={cn("h-12 gap-2 px-4", className)} {...props}>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Download Unique Mentors on the App Store">
        <AppleIcon className="h-5 w-5" />
        <span className="flex flex-col items-start justify-center pr-2 text-left">
          <span className="text-[10px] leading-none tracking-normal">Download on the</span>
          <span className="text-base font-bold leading-none">App Store</span>
        </span>
      </a>
    </Button>
  );
}

function AppleIcon({ fill = "currentColor", ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} aria-hidden="true" {...props}>
      <path d="M18.546 12.763c.024-1.87 1.004-3.597 2.597-4.576-1.009-1.442-2.64-2.323-4.399-2.378-1.851-.194-3.645 1.107-4.588 1.107-.961 0-2.413-1.088-3.977-1.056-2.057.067-3.929 1.208-4.93 3.007-2.131 3.69-.542 9.114 1.5 12.097 1.022 1.461 2.215 3.092 3.778 3.035 1.529-.063 2.1-.975 3.945-.975 1.828 0 2.364.975 3.958.938 1.64-.027 2.674-1.467 3.66-2.942.734-1.041 1.299-2.191 1.673-3.408-1.948-.824-3.215-2.733-3.217-4.849Z" />
      <path d="M15.535 3.847C16.429 2.773 16.87 1.393 16.763 0c-1.366.144-2.629.797-3.535 1.829-.895 1.019-1.349 2.351-1.261 3.705 1.385.014 2.7-.608 3.568-1.687Z" />
    </svg>
  );
}

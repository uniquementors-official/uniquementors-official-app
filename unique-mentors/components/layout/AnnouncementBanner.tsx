export function AnnouncementBanner({ text }: { text: string }) {
  return (
    <div className="relative z-[60] flex h-10 w-full items-center overflow-hidden bg-gradient-to-r from-primary to-secondary px-4 text-xs font-semibold text-white shadow-soft transition duration-300 md:text-sm">
      <div className="mx-auto flex max-w-full items-center justify-center gap-2 overflow-hidden">
        <span className="shrink-0 animate-pulse">📢</span>
        <span className="truncate whitespace-nowrap">{text}</span>
      </div>
    </div>
  );
}

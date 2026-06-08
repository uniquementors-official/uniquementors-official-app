export function AnnouncementBanner({ text }: { text: string }) {
  return (
    <div className="relative z-[60] flex min-h-[40px] w-full items-center justify-center bg-gradient-to-r from-primary to-secondary px-4 py-2 text-center text-xs font-semibold text-white shadow-soft transition duration-300 md:text-sm">
      <div className="flex items-center justify-center gap-2">
        <span className="animate-pulse">📢</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

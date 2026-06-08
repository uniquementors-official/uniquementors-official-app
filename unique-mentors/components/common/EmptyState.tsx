import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";

type EmptyStateProps = {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ icon = "Search", title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="surface flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
        <Icon name={icon} className="h-7 w-7" />
      </div>
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

import { Icon } from "@/components/common/Icon";

type DashboardStatsProps = {
  stats: Array<{
    label: string;
    value: string | number;
    change: string;
    icon: string;
    color: "blue" | "green" | "purple" | "orange";
  }>;
};

const colors = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  purple: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  orange: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="surface p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-2 font-display text-3xl font-bold">{stat.value}</p>
            </div>
            <div className={`rounded-md p-3 ${colors[stat.color]}`}>
              <Icon name={stat.icon} className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-4 text-xs font-semibold text-secondary">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}

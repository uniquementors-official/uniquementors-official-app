"use client";

import { ReactNode, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Icon } from "@/components/common/Icon";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  getRowId: (row: T) => string;
};

export function DataTable<T extends Record<string, unknown>>({ columns, data, isLoading = false, getRowId }: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const rows = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const left = String(a[sortKey] ?? "");
      const right = String(b[sortKey] ?? "");
      return direction === "asc" ? left.localeCompare(right) : right.localeCompare(left);
    });
  }, [data, direction, sortKey]);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setDirection("asc");
  }

  if (isLoading) return <LoadingSpinner variant="page" />;
  if (!data.length) return <EmptyState title="No records found" description="Create content or adjust your filters." />;

  return (
    <div className="surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-900">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={selected.size === rows.length}
                  onChange={(event) => setSelected(event.target.checked ? new Set(rows.map(getRowId)) : new Set())}
                />
              </th>
              {columns.map((column) => (
                <th key={String(column.key)} className="p-4">
                  {column.sortable ? (
                    <button type="button" className="inline-flex items-center gap-2 font-bold" onClick={() => toggleSort(String(column.key))}>
                      {column.header}
                      <Icon name="ChevronDown" className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {rows.map((row) => {
              const rowId = getRowId(row);
              return (
                <tr key={rowId} className="hover:bg-slate-50 dark:hover:bg-slate-900/70">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${rowId}`}
                      checked={selected.has(rowId)}
                      onChange={(event) => {
                        const next = new Set(selected);
                        if (event.target.checked) next.add(rowId);
                        else next.delete(rowId);
                        setSelected(next);
                      }}
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={`${rowId}-${String(column.key)}`} className="p-4 align-top">
                      {column.render ? column.render(row) : String(row[column.key] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-800">
        <span>{selected.size} selected</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

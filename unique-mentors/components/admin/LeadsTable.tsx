"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Icon } from "@/components/common/Icon";

const leadStatuses = ["NEW", "CONTACTED", "ENROLLED", "CLOSED"] as const;

export type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  examType: string;
  source: string;
  status: string;
  date: string;
};

export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const [rows, setRows] = useState(leads);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setRows(leads);
  }, [leads]);

  const updateStatus = useCallback(async (row: LeadRow, status: LeadRow["status"]) => {
    const previousStatus = row.status;
    setRows((current) => current.map((item) => (item.id === row.id ? { ...item, status } : item)));
    setUpdatingIds((current) => {
      const next = new Set(current);
      next.add(row.id);
      return next;
    });

    try {
      const response = await fetch(`/api/leads/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const result = (await response.json()) as { success: boolean; error?: string };
      if (!result.success) throw new Error(result.error || "Unable to update lead");
      toast.success("Lead status updated.");
    } catch (error) {
      setRows((current) => current.map((item) => (item.id === row.id ? { ...item, status: previousStatus } : item)));
      toast.error(error instanceof Error ? error.message : "Unable to update lead");
    } finally {
      setUpdatingIds((current) => {
        const next = new Set(current);
        next.delete(row.id);
        return next;
      });
    }
  }, []);

  const columns = useMemo<Column<LeadRow>[]>(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: true,
        render: (row) => (
          <div>
            <p className="font-semibold">{row.name}</p>
            <p className="text-xs text-slate-500">{row.email}</p>
          </div>
        )
      },
      { key: "phone", header: "Phone", render: (row) => <a href={`tel:${row.phone}`} className="font-semibold text-primary">{row.phone}</a> },
      { key: "profession", header: "Profession" },
      { key: "examType", header: "Exam", render: (row) => <Badge>{row.examType}</Badge> },
      { key: "source", header: "Source", render: (row) => <Badge variant="outline">{row.source}</Badge> },
      {
        key: "status",
        header: "Status",
        render: (row) => (
          <select
            value={row.status}
            disabled={updatingIds.has(row.id)}
            className="rounded-md border border-slate-200 bg-background px-2 py-1 text-sm"
            onChange={(event) => updateStatus(row, event.target.value as LeadRow["status"])}
          >
            {leadStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        )
      },
      { key: "date", header: "Date" }
    ],
    [updateStatus, updatingIds]
  );

  function exportCsv() {
    const csv = [
      "Name,Email,Phone,Profession,Exam,Source,Status,Date",
      ...rows.map((row) =>
        [row.name, row.email, row.phone, row.profession, row.examType, row.source, row.status, row.date]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "unique-mentors-leads.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={exportCsv}>
          <Icon name="Download" className="h-4 w-4" />
          Export CSV
        </Button>
      </div>
      <DataTable columns={columns} data={rows} getRowId={(row) => row.id} />
    </div>
  );
}

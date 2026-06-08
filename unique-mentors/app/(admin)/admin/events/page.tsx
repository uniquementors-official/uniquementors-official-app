"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/common/Icon";
import { formatDate } from "@/lib/utils";

type EventItemAdmin = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  eventDate: string;
  location: string;
  coverImage?: string;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
};

export default function EventManagerPage() {
  const [events, setEvents] = useState<EventItemAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events?limit=100&includeDrafts=true");
      const result = await response.json();
      if (result.success && result.data?.items) {
        setEvents(result.data.items);
      } else {
        toast.error("Failed to load events");
      }
    } catch (e) {
      toast.error("Error loading events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = useCallback(async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const response = await fetch(`/api/events/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (result.success) {
        toast.success("Event deleted.");
        setEvents((prev) => prev.filter((e) => e.id !== id));
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch (e) {
      toast.error("Error deleting event");
    }
  }, []);

  const columns = useMemo<Column<EventItemAdmin>[]>(
    () => [
      {
        key: "coverImage",
        header: "Cover",
        render: (row) => (
          <div className="relative h-11 w-11 overflow-hidden rounded-md">
            <Image src={row.coverImage || "/images/image.png"} alt={row.title} fill className="object-cover" />
          </div>
        )
      },
      {
        key: "title",
        header: "Title",
        sortable: true,
        render: (row) => (
          <div>
            <p className="font-semibold">{row.title}</p>
            <p className="text-xs text-slate-500">/{row.slug}</p>
          </div>
        )
      },
      {
        key: "eventDate",
        header: "Event Date",
        render: (row) => formatDate(row.eventDate)
      },
      { key: "location", header: "Location" },
      {
        key: "status",
        header: "Status",
        render: (row) => (
          <Badge variant={row.status === "PUBLISHED" ? "success" : "muted"}>
            {row.status.toLowerCase()}
          </Badge>
        )
      },
      {
        key: "actions",
        header: "Actions",
        render: (row) => (
          <div className="flex gap-2">
            <Link href={`/admin/events/${row.id}`} aria-label={`Edit ${row.title}`}>
              <Icon name="Edit" className="h-4 w-4 text-primary" />
            </Link>
            <Link href={`/events/${row.slug}`} target="_blank" aria-label={`View ${row.title}`}>
              <Icon name="Eye" className="h-4 w-4 text-secondary" />
            </Link>
            <button type="button" aria-label={`Delete ${row.title}`} onClick={() => handleDelete(row.id, row.title)}>
              <Icon name="Trash2" className="h-4 w-4 text-destructive" />
            </button>
          </div>
        )
      }
    ],
    [handleDelete]
  );

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" || e.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [events, search, statusFilter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Events & Highlights</h2>
          <p className="text-sm text-slate-500">Manage institutional partnerships, webinars, quiz competitions, and seminars.</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <Icon name="Plus" className="h-4 w-4" />
            New Event
          </Link>
        </Button>
      </div>

      <div className="surface grid gap-3 p-4 sm:grid-cols-2">
        <input
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          placeholder="Search events by title, summary or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Icon name="Loader2" className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <DataTable columns={columns} data={filteredEvents} getRowId={(row) => row.id} />
      )}
    </div>
  );
}

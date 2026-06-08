"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/common/Icon";
import type { Course } from "@/types";

export default function CourseManagerPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/courses?includeDrafts=true");
      const result = await response.json();
      if (result.success && result.data) {
        setCourses(
          result.data.map((c: any) => ({
            ...c,
            status: c.status.toLowerCase(),
            excerpt: c.shortDescription,
            coverImage: c.coverImage || "/images/metro-pillar-candidate.png",
            imageAlt: c.title
          }))
        );
      } else {
        toast.error("Failed to load courses");
      }
    } catch (e) {
      toast.error("Error loading courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = useCallback(async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the course "${title}"?`)) return;
    try {
      const response = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (result.success) {
        toast.success("Course deleted.");
        setCourses((prev) => prev.filter((c) => c.id !== id));
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch (e) {
      toast.error("Error deleting course");
    }
  }, []);

  const columns = useMemo<Column<Course>[]>(
    () => [
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
      { key: "examType", header: "Exam", render: (row) => <Badge>{row.examType}</Badge> },
      { key: "profession", header: "Profession" },
      { key: "country", header: "Country" },
      {
        key: "status",
        header: "Status",
        render: (row) => (
          <Badge variant={row.status === "published" ? "success" : "muted"}>
            {row.status}
          </Badge>
        )
      },
      {
        key: "featured",
        header: "Featured",
        render: (row) => <input type="checkbox" checked={row.featured} readOnly aria-label={`Featured ${row.title}`} />
      },
      {
        key: "actions",
        header: "Actions",
        render: (row) => (
          <div className="flex gap-2">
            <Link href={`/admin/courses/${row.id}`} aria-label={`Edit ${row.title}`}>
              <Icon name="Edit" className="h-4 w-4 text-primary" />
            </Link>
            <Link href={`/courses/${row.slug}`} target="_blank" aria-label={`View ${row.title}`}>
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

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      return (
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.profession.toLowerCase().includes(search.toLowerCase()) ||
        c.country.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [courses, search]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Courses</h2>
          <p className="text-sm text-slate-500">Manage exam training programs and licensing pathways.</p>
        </div>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Icon name="Plus" className="h-4 w-4" />
            New Course
          </Link>
        </Button>
      </div>

      <div className="surface p-4">
        <input
          className="h-10 w-full max-w-md rounded-md border border-input bg-background px-3 text-sm"
          placeholder="Search courses by title, profession or country"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Icon name="Loader2" className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <DataTable columns={columns} data={filteredCourses} getRowId={(row) => row.id} />
      )}
    </div>
  );
}

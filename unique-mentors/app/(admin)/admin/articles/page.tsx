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
import type { ArticlePost } from "@/types";

export default function ArticleManagerPage() {
  const [articles, setArticles] = useState<ArticlePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/articles?limit=100&includeDrafts=true");
      const result = await response.json();
      if (result.success && result.data?.items) {
        setArticles(
          result.data.items.map((b: any) => ({
            ...b,
            status: b.status.toLowerCase(),
            coverImage: b.coverImage || "/images/image.png",
            imageAlt: b.title
          }))
        );
      } else {
        toast.error("Failed to load articles");
      }
    } catch (e) {
      toast.error("Error loading articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = useCallback(async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const response = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (result.success) {
        toast.success("Article post deleted.");
        setArticles((prev) => prev.filter((b) => b.id !== id));
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch (e) {
      toast.error("Error deleting post");
    }
  }, []);

  const columns = useMemo<Column<ArticlePost>[]>(
    () => [
      {
        key: "coverImage",
        header: "Cover",
        render: (row) => (
          <div className="relative h-11 w-11 overflow-hidden rounded-md">
            <Image src={row.coverImage} alt={row.imageAlt} fill className="object-cover" />
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
      { key: "category", header: "Category", render: (row) => <Badge variant="outline">{row.category}</Badge> },
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
      { key: "readTime", header: "Read" },
      { key: "publishedAt", header: "Created/Published", render: (row) => formatDate(row.publishedAt) },
      {
        key: "actions",
        header: "Actions",
        render: (row) => (
          <div className="flex gap-2">
            <Link href={`/admin/articles/${row.id}`} aria-label={`Edit ${row.title}`}>
              <Icon name="Edit" className="h-4 w-4 text-primary" />
            </Link>
            <Link href={`/article/${row.slug}`} target="_blank" aria-label={`View ${row.title}`}>
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

  const categories = useMemo(() => {
    return Array.from(new Set(articles.map((b) => b.category)));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((b) => {
      const matchesSearch =
        !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" || b.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesCategory = categoryFilter === "All Categories" || b.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [articles, search, statusFilter, categoryFilter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Article Posts</h2>
          <p className="text-sm text-slate-500">Manage SEO articles, event posts and licensing guides.</p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Icon name="Plus" className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="surface grid gap-3 p-4 sm:grid-cols-3">
        <input
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          placeholder="Search posts"
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
        <select
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Icon name="Loader2" className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <DataTable columns={columns} data={filteredArticles} getRowId={(row) => row.id} />
      )}
    </div>
  );
}

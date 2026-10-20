"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import type { StudyAbroadPost } from "@/types";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/common/Icon";
import { formatDate } from "@/lib/utils";

export default function StudyAbroadManagerPage() {
  const [posts, setPosts] = useState<StudyAbroadPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [countryFilter, setCountryFilter] = useState("All Countries");

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/study-abroad?limit=100&includeDrafts=true");
      const result = await response.json();
      if (!result.success || !result.data?.items) throw new Error(result.error || "Failed to load guides");
      setPosts(result.data.items.map((post: any) => ({ ...post, status: post.status.toLowerCase(), coverImage: post.coverImage || "/images/metro-pillar-candidate.png", imageAlt: post.title, intake: post.intake || "", publishedAt: post.publishedAt || post.createdAt })));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error loading study abroad posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleDelete = useCallback(async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/study-abroad/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!result.success) throw new Error(result.error || "Delete failed");
      toast.success("Study abroad post deleted.");
      setPosts((current) => current.filter((post) => post.id !== id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete post");
    }
  }, []);

  const columns = useMemo<Column<StudyAbroadPost>[]>(() => [
    { key: "coverImage", header: "Cover", render: (row) => <div className="relative h-11 w-11 overflow-hidden rounded-md"><Image src={row.coverImage} alt={row.imageAlt} fill className="object-cover" /></div> },
    { key: "title", header: "Guide", sortable: true, render: (row) => <div><p className="font-semibold">{row.title}</p><p className="text-xs text-slate-500">/study-abroad/{row.slug}</p></div> },
    { key: "country", header: "Destination", render: (row) => <Badge variant="outline">{row.country}</Badge> },
    { key: "service", header: "Service" },
    { key: "status", header: "Status", render: (row) => <Badge variant={row.status === "published" ? "success" : "muted"}>{row.status}</Badge> },
    { key: "featured", header: "Featured", render: (row) => <input type="checkbox" checked={row.featured} readOnly aria-label={`Featured ${row.title}`} /> },
    { key: "publishedAt", header: "Created/Published", render: (row) => formatDate(row.publishedAt) },
    { key: "actions", header: "Actions", render: (row) => <div className="flex gap-3"><Link href={`/admin/study-abroad/${row.id}`} aria-label={`Edit ${row.title}`}><Icon name="Edit" className="h-4 w-4 text-primary" /></Link><Link href={`/study-abroad/${row.slug}`} target="_blank" aria-label={`View ${row.title}`}><Icon name="Eye" className="h-4 w-4 text-secondary" /></Link><button type="button" aria-label={`Delete ${row.title}`} onClick={() => handleDelete(row.id, row.title)}><Icon name="Trash2" className="h-4 w-4 text-destructive" /></button></div> }
  ], [handleDelete]);

  const countries = useMemo(() => Array.from(new Set(posts.map((post) => post.country))).sort(), [posts]);
  const filteredPosts = useMemo(() => posts.filter((post) => (
    (!search || `${post.title} ${post.excerpt} ${post.country} ${post.service}`.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === "All Status" || post.status === statusFilter.toLowerCase()) &&
    (countryFilter === "All Countries" || post.country === countryFilter)
  )), [posts, search, statusFilter, countryFilter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="font-display text-2xl font-bold">Study Abroad</h1><p className="text-sm text-slate-500">Manage destination guides, application advice and counselling content.</p></div><Button asChild><Link href="/admin/study-abroad/new"><Icon name="Plus" className="h-4 w-4" />New Guide</Link></Button></div>
      <div className="surface grid gap-3 p-4 sm:grid-cols-3"><input className="h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder="Search guides" value={search} onChange={(event) => setSearch(event.target.value)} /><select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All Status</option><option value="published">Published</option><option value="draft">Draft</option></select><select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)}><option>All Countries</option>{countries.map((country) => <option key={country}>{country}</option>)}</select></div>
      {loading ? <div className="flex justify-center py-20"><Icon name="Loader2" className="h-8 w-8 animate-spin text-primary" /></div> : <DataTable columns={columns} data={filteredPosts} getRowId={(row) => row.id} />}
    </div>
  );
}

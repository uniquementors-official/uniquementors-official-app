"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";

type ImageUploadProps = {
  value?: string;
  onChange: (url: string) => void;
};

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const result = (await response.json()) as { success: boolean; data?: { url: string }; error?: string };
      if (!result.success || !result.data) throw new Error(result.error || "Upload failed");
      onChange(result.data.url);
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-lg border border-dashed border-slate-300 p-4 dark:border-slate-700">
      {value ? (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-md">
          <Image src={value} alt="Uploaded preview" fill className="object-cover" />
        </div>
      ) : null}
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-md bg-slate-50 px-4 py-8 text-center dark:bg-slate-900">
        <Icon name={uploading ? "Loader2" : "Upload"} className={uploading ? "h-7 w-7 animate-spin text-primary" : "h-7 w-7 text-primary"} />
        <span className="mt-2 text-sm font-semibold">Upload image</span>
        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={upload} disabled={uploading} />
      </label>
      {value ? (
        <Button type="button" variant="outline" size="sm" className="mt-3 w-full" onClick={() => onChange("")}>
          Remove image
        </Button>
      ) : null}
    </div>
  );
}

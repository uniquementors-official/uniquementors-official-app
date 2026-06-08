"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";

type SocialShareProps = {
  url: string;
  title: string;
};

export function SocialShare({ url, title }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    toast.success("Article link copied.");
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild variant="outline" size="sm">
        <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer">
          <Icon name="MessageCircle" className="h-4 w-4" />
          WhatsApp
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
          <Icon name="Share2" className="h-4 w-4" />
          Facebook
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer">
          <Icon name="Link" className="h-4 w-4" />
          LinkedIn
        </a>
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={copyLink}>
        <Icon name="Copy" className="h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
}

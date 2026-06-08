"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/common/Icon";

export default function SettingsPage() {
  // Site details
  const [siteName, setSiteName] = useState("Unique Mentors");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [addressStr, setAddressStr] = useState("");
  const [googleAnalytics, setGoogleAnalytics] = useState("");

  // Social Links
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Announcement Banner
  const [announcement, setAnnouncement] = useState("");
  const [announcementOn, setAnnouncementOn] = useState(false);

  // States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // AI assistant states
  const [aiTopic, setAiTopic] = useState("");
  const [aiDiscount, setAiDiscount] = useState("");
  const [aiType, setAiType] = useState("promotional");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/settings");
        const result = await response.json();
        if (result.success && result.data) {
          const settings = result.data;
          setSiteName(settings.siteName || "Unique Mentors");
          setTagline(settings.tagline || "");
          setDescription(settings.description || "");
          setPhone(settings.phone || "");
          setWhatsapp(settings.whatsapp || "");
          setEmail(settings.email || "");
          setGoogleAnalytics(settings.googleAnalytics || "");

          if (settings.address) {
            setAddressStr(settings.address.display || "");
          }

          if (settings.socialLinks) {
            setFacebook(settings.socialLinks.facebook || "");
            setInstagram(settings.socialLinks.instagram || "");
            setYoutube(settings.socialLinks.youtube || "");
            setLinkedin(settings.socialLinks.linkedin || "");
          }

          setAnnouncement(settings.announcement || "");
          setAnnouncementOn(Boolean(settings.announcementOn));
        }
      } catch (e) {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName,
          tagline,
          description,
          phone,
          whatsapp,
          email,
          googleAnalytics,
          address: {
            display: addressStr,
            street: addressStr.split(",")[0] || "",
            locality: "Kochi",
            region: "Kerala",
            postalCode: "682016",
            country: "IN"
          },
          socialLinks: {
            facebook,
            instagram,
            youtube,
            linkedin
          },
          announcement,
          announcementOn
        })
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Settings saved successfully.");
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch (e) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateAnnouncement = async () => {
    setAiLoading(true);
    setAiSuggestions([]);
    try {
      const response = await fetch("/api/generate-announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          discount: aiDiscount,
          type: aiType
        })
      });
      const result = await response.json();
      if (result.success && result.data?.variations) {
        setAiSuggestions(result.data.variations);
        toast.success("Suggestions generated!");
      } else {
        toast.error("Generation failed");
      }
    } catch (e) {
      toast.error("Generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Icon name="Loader2" className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-bold">Site Settings</h2>
        <p className="text-sm text-slate-500">Update public contact details, social links and announcement banners.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        {/* Settings Form */}
        <form onSubmit={handleSave} className="surface space-y-6 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="site-name">Site Name</Label>
              <Input id="site-name" className="mt-2" value={siteName} onChange={(e) => setSiteName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="site-email">Email</Label>
              <Input id="site-email" className="mt-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="site-phone">Phone</Label>
              <Input id="site-phone" className="mt-2" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="site-whatsapp">WhatsApp</Label>
              <Input id="site-whatsapp" className="mt-2" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="site-tagline">Tagline</Label>
              <Input id="site-tagline" className="mt-2" value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="site-ga">Google Analytics ID</Label>
              <Input id="site-ga" className="mt-2" value={googleAnalytics} onChange={(e) => setGoogleAnalytics(e.target.value)} placeholder="G-XXXXXXXXXX" />
            </div>
          </div>

          <div>
            <Label htmlFor="site-address">Address</Label>
            <Textarea id="site-address" className="mt-2" value={addressStr} onChange={(e) => setAddressStr(e.target.value)} rows={3} required />
          </div>

          <div className="border-t border-slate-200 pt-5 dark:border-slate-800 space-y-4">
            <h3 className="font-display font-bold text-lg">Announcement Banner</h3>
            <div>
              <Label htmlFor="announcement-text">Banner Announcement Message</Label>
              <Textarea
                id="announcement-text"
                className="mt-2 font-medium"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="E.g., Happy New Year! Get 15% discount on MOH/DHA courses. Limit slots."
                rows={2}
                maxLength={140}
              />
              <p className="mt-1 text-xs text-slate-500">Max 140 characters. Will display at the very top of all pages.</p>
            </div>
            <label className="flex items-center gap-3 text-sm font-semibold select-none cursor-pointer">
              <input type="checkbox" checked={announcementOn} onChange={(e) => setAnnouncementOn(e.target.checked)} />
              Make announcement live on website
            </label>
          </div>

          <div className="border-t border-slate-200 pt-5 dark:border-slate-800 space-y-4">
            <h3 className="font-display font-bold text-lg">Social Links</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="link-facebook">Facebook</Label>
                <Input id="link-facebook" className="mt-2" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="link-instagram">Instagram</Label>
                <Input id="link-instagram" className="mt-2" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="link-youtube">YouTube</Label>
                <Input id="link-youtube" className="mt-2" value={youtube} onChange={(e) => setYoutube(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="link-linkedin">LinkedIn</Label>
                <Input id="link-linkedin" className="mt-2" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Save" className="h-4 w-4" />}
            Save Settings
          </Button>
        </form>

        {/* AI Generator Panel */}
        <aside className="space-y-5">
          <div className="surface p-5 border border-primary/20 bg-primary/5 dark:bg-primary/5">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Sparkles" className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-lg text-primary">AI Announcement Writer</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Generate conversion-focused top-bar announcements using your campaign details.
            </p>

            <div className="space-y-4">
              <div>
                <Label className="text-xs font-bold uppercase tracking-wider" htmlFor="ai-topic">Campaign Topic / Holiday</Label>
                <Input
                  id="ai-topic"
                  className="mt-1 h-9 text-xs"
                  placeholder="E.g., Happy New Year, CORU seminar, Eid Special"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-xs font-bold uppercase tracking-wider" htmlFor="ai-discount">Offer / Discount (Optional)</Label>
                <Input
                  id="ai-discount"
                  className="mt-1 h-9 text-xs"
                  placeholder="E.g., 15% discount, Flat 5000 Rs off"
                  value={aiDiscount}
                  onChange={(e) => setAiDiscount(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-xs font-bold uppercase tracking-wider" htmlFor="ai-type">Promo Category</Label>
                <select
                  id="ai-type"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  value={aiType}
                  onChange={(e) => setAiType(e.target.value)}
                >
                  <option value="promotional">Promotional Offer (Sell courses)</option>
                  <option value="holiday">Holiday Celebration</option>
                  <option value="counselling">Free Counselling & News</option>
                </select>
              </div>

              <Button type="button" className="w-full text-xs h-9" onClick={handleGenerateAnnouncement} disabled={aiLoading || !aiTopic}>
                {aiLoading ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Sparkles" className="h-4 w-4" />}
                Generate Suggestions
              </Button>
            </div>

            {aiSuggestions.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Suggested Banner Copies:</p>
                <div className="space-y-2">
                  {aiSuggestions.map((sug, idx) => (
                    <div key={idx} className="p-2.5 rounded border border-slate-200 bg-white text-xs dark:border-slate-800 dark:bg-slate-950 space-y-2">
                      <p className="font-medium text-slate-800 dark:text-slate-200 leading-relaxed">&ldquo;{sug}&rdquo;</p>
                      <button
                        type="button"
                        className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline"
                        onClick={() => {
                          setAnnouncement(sug);
                          toast.success("Applied to announcement input!");
                        }}
                      >
                        <Icon name="Check" className="h-3 w-3" /> Use this copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

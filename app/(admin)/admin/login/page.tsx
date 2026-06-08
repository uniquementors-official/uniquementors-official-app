"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/common/Icon";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });
    setLoading(false);

    if (result?.error) {
      setError("Invalid admin credentials.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-navy via-slate-950 to-brand-blue px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-white/10 bg-white p-8 shadow-glow dark:bg-slate-950">
        <Link href="/" className="mx-auto flex w-max items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-white">UM</span>
          <span className="font-display text-xl font-bold">Unique Mentors</span>
        </Link>
        <h1 className="mt-8 text-center font-display text-2xl font-bold">Admin Portal</h1>
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="admin-email">Email</Label>
            <Input id="admin-email" name="email" type="email" className="mt-2" required />
          </div>
          <div>
            <Label htmlFor="admin-password">Password</Label>
            <div className="relative mt-2">
              <Input id="admin-password" name="password" type={showPassword ? "text" : "password"} className="pr-12" required />
              <button type="button" className="absolute inset-y-0 right-0 flex w-11 items-center justify-center" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}>
                <Icon name={showPassword ? "EyeOff" : "Eye"} className="h-4 w-4" />
              </button>
            </div>
          </div>
          {error ? <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Lock" className="h-4 w-4" />}
            Sign In
          </Button>
        </div>
      </form>
    </main>
  );
}

import { OrbitalLoader } from "@/components/ui/orbital-loader";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-primary">
      <OrbitalLoader message="Loading Unique Mentors" />
    </div>
  );
}

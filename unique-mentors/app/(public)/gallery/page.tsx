"use client";

import * as React from "react";
import { Gallery, GalleryGrid, GalleryImage } from "@/components/ui/shared-element-gallery";

const IMAGES = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1200&q=80",
    alt: "Flat-lay photography of a professional desk with a passport, medical license document, UAE visa stamp, stethoscope, and flags."
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    alt: "A confident young Indian healthcare professional in a white coat holding a tablet, standing in front of a glowing world map."
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    alt: "Stethoscope on keyboard with a notebook, representing medical exam preparation."
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=1200&q=80",
    alt: "Doctor checking licensing requirements on a tablet."
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    alt: "Healthcare career mentorship meeting."
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    alt: "Mentoring session for MOH DHA HAAD coaching."
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    alt: "Dataflow verification documentation processing."
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80",
    alt: "Mock test practice on a computer."
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
    alt: "Candidate preparing for a healthcare interview."
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
    alt: "Eligibility roadmap and global healthcare careers planning."
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    alt: "Confident young female doctor standing in a hospital lobby."
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern medical office desk with a laptop and stethoscope."
  }
];

export default function GalleryDemo() {
  // Fix for app.tsx infrastructure horizontal scrolling
  React.useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="w-full self-start min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <header className="mb-16 space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-primary">
            Curated Spaces
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A premium photo experience with seamless shared-element transitions. 
            Tap any image to expand, drag vertically to dismiss.
          </p>
        </header>

        <Gallery>
          <GalleryGrid>
            {IMAGES.map((image) => (
              <GalleryImage 
                key={image.id} 
                id={image.id} 
                src={image.src} 
                alt={image.alt} 
                className="mb-4 break-inside-avoid rounded-xl"
                imgClassName="rounded-xl"
              />
            ))}
          </GalleryGrid>
        </Gallery>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SquareData = {
  id: number;
  src: string;
};

const squareData: SquareData[] = [
  { id: 1, src: "/images/image.png" },
  { id: 2, src: "/images/image copy.png" },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=900&q=80"
  }
];

function shuffle<T>(array: T[]) {
  const next = [...array];
  let currentIndex = next.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [next[currentIndex], next[randomIndex]] = [next[randomIndex] as T, next[currentIndex] as T];
  }

  return next;
}

function generateSquares(data: SquareData[]) {
  return shuffle(data).map((square) => (
    <motion.div
      key={square.id}
      layout
      transition={{ duration: 1.45, type: "spring", bounce: 0.18 }}
      className="h-full w-full overflow-hidden rounded-lg border border-white/10 bg-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(3, 10, 26, 0.16), rgba(3, 10, 26, 0)), url(${square.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    />
  ));
}

export function ShuffleGrid({ className }: { className?: string }) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const data = useMemo(() => squareData, []);
  const [squares, setSquares] = useState(() => generateSquares(data));

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares(data));
      timeoutRef.current = setTimeout(shuffleSquares, 3200);
    };

    timeoutRef.current = setTimeout(shuffleSquares, 800);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data]);

  return (
    <div
      className={cn(
        "grid h-[360px] w-full max-w-[460px] grid-cols-4 grid-rows-4 gap-2 rounded-lg bg-white/[0.08] p-2 shadow-[0_32px_80px_rgba(0,0,0,0.3)] ring-1 ring-white/15 backdrop-blur-sm md:h-[430px]",
        className
      )}
    >
      {squares}
    </div>
  );
}

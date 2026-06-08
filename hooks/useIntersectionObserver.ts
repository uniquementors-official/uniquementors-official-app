"use client";

import { useEffect, useState } from "react";

export function useIntersectionObserver<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const [node, setNode] = useState<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -80px 0px",
        ...options
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, options]);

  return { ref: setNode, isIntersecting };
}

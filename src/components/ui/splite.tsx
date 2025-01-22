"use client";

import { useState, Suspense } from "react";
import Spline from "@splinetool/react-spline";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("w-full h-full bg-transparent relative", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
      )}
      <Suspense fallback={null}>
        <Spline
          scene={scene}
          onLoad={() => setIsLoading(false)}
        />
      </Suspense>
    </div>
  );
}
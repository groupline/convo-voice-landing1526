"use client";

import { useState, Suspense, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Reduced wait time on mobile from 1000ms to 500ms
    if (isMobile) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  return (
    <div 
      className={cn(
        "w-full h-full bg-transparent relative",
        isMobile ? "max-h-[300px]" : "max-h-[500px]",
        className
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
      )}
      {shouldRender && (
        <Suspense fallback={null}>
          <Spline
            scene={scene}
            onLoad={() => setIsLoading(false)}
            style={{
              width: '100%',
              height: isMobile ? '300px' : '500px',
              maxWidth: '100vw',
              // Removed scale transformation on mobile for faster rendering
              transform: 'none',
              transformOrigin: 'center center'
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
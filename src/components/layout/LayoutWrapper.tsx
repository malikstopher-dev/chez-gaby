'use client';

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!showContent && <LoadingScreen loading={loading} />}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }}
      >
        {children}
      </div>
    </>
  );
}
